import { ManagementService } from './management.service';
import { LocalManagementService } from './local-management.service';
import { Http } from '@angular/http';
import { IManagementService } from './IManagementService';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArtifactInfo } from '../../types/types';
import { Injectable } from '@angular/core';
import { HEARTBEAT_URL } from '../consts';
import { TransformationService } from './transformation.service';
import {
    ArtifactKey,
    DiExecutionInput,
    ExecutionInput,
    ExecutionResult,
    FactTypeDetails,
    Messages
} from '../../model/execution';
import { UtilsService } from '../../services/utils.service';
import {DeDetails, FlowDetails} from "../di-integration/di-integration.component";


export interface ExecutionResponse {
    data: any;
    messages: MessagesMap;
}

interface MessagesMap {
    [name: string]: { category: string, text: string }[];
}


@Injectable()
export class ManagementServiceFacade {

    private managementServiceImp: IManagementService;
    public isLocal$: BehaviorSubject<boolean>;
    private flow: any;

    constructor(private http: Http, managementService: ManagementService, localManagementService: LocalManagementService, private transformationService: TransformationService, private utilsService: UtilsService) {
        this.isLocal$ = new BehaviorSubject(null);

        let heartBeat = this.utilsService.getLocalUrl() + HEARTBEAT_URL;
        let obs = this.http.get(heartBeat);

        obs.subscribe(_ok => {
            this.managementServiceImp = localManagementService;
            this.isLocal$.next(this.isLocal());
        }, (_err) => {
            this.managementServiceImp = managementService;
            this.isLocal$.next(this.isLocal());
        });
    }

    public isLocal() {
        return this.managementServiceImp.constructor.name == 'LocalManagementService';
    }

    public getDEsInfo(): Observable<any[]> {
        return this.managementServiceImp.getDEsInfo();
    }

    public getDEHealthCheck(de: any): Observable<any> {
        return this.managementServiceImp.getDEHealthCheck(de).map((result: any) => {
            if (result.error) {
                return this.extractErrorMessage(result.error);
            } else {
                return result;
            }
        });
    }

    public getArtifacts(de: any): Observable<ArtifactInfo[]> {
        return this.managementServiceImp.getFlows(de).map((result: any) => {
            if (result.error) {
                return this.extractErrorMessage(result.error);
            } else {
                return result;
            }

        });
    }

    public execute(data: any, de?: any): Observable<any> {

        let executionInputs = this.transformExecutionInput(this.flow, data, false);

        return this.managementServiceImp.execute(executionInputs, de)
            .map((result: any) => {
                if (result.error) {
                    return this.extractErrorMessage(result.error);
                }
                else {

                    return this.transformExecutionResult(result);
                }
            });
    }

    public executeDi(clientId: string, deDetails: DeDetails, flowDetails: FlowDetails): Observable<any>{
        this.flow = flowDetails;
        let executionInputs: DiExecutionInput = this.transformExecutionInput(this.flow, clientId, true) as any;
        return this.managementServiceImp.executeDi(executionInputs, deDetails)
            .map((result: any) => {
                if (result.error) {
                    return this.extractErrorMessage(result.error);
                }
                else {
                    let notNullFts = {};
                    Object.keys(result.trace.root).forEach(key => {
                        if (result.trace.root[key] != null){
                            notNullFts[key] =  result.trace.root[key];
                        }
                    });
                    this.saveFlowInputs(notNullFts);
                    return this.transformExecutionResult(result);
                }
            });
    }

    callAlis(json: string){
        this.managementServiceImp.callAlis(json).subscribe(response => {
            console.log(response);
        })
    }

    getFlowSchema(flow: any, de?: any): Observable<any> {
        this.flow = flow;
        return this.managementServiceImp.getFlowSchema(flow, de).map(result => {
            if (result.error) {
                return this.extractErrorMessage(result.error);
            }
            else {
                return this.transformationService.transformToFormSchema(result);
            }
        });
    }

    getFlowManifest(flow: any, de?: any): Observable<any> {
        this.flow = flow;
        return this.managementServiceImp.getFlowSchema(flow, de).map(result => {
            if (result.error) {
                return this.extractErrorMessage(result.error);
            }
            else {
                return result;
            }
        });
    }

    private flowInputs: any = {};

    public saveFlowInputs(inputs: any) {
        Object.assign(this.flowInputs, inputs);
    }

    public clearFlowInputs(){
        this.flowInputs = {};
    }

    public getFlowInputs() {
        Object.keys(this.flowInputs).forEach(key=>{
            if(this.flowInputs[key] == '') {
                this.flowInputs[key] = null;
            }
        });
        return this.flowInputs;
    }

    transformExecutionInput(flow: any, data: any, di: boolean) {
        let artifactKey: ArtifactKey = {
            name: flow.name,
            releaseName: flow.releaseName,
            tagName: flow.tagName,
            artifactType: 'FLOW'
        };

        let result: ExecutionInput | DiExecutionInput;
        if (!di){
            result = {
                executableKey: {
                    artifactKey,
                    effectiveDate: '2019-01-01'
                },
                executionInput: {
                    root: data
                },
                executionConfiguration: null
            };
        }  else {
            result = {
                executableKey: {
                    artifactKey,
                    effectiveDate: '2019-01-01'
                },
               instanceId: data,
                executionConfiguration: {}
            }
        }

        return result;
    }

    transformExecutionResult(executionResult: ExecutionResult) {
        // TODO: Handle list value better

        return {
            result: executionResult.conclusion,
            requiredFTs: executionResult.requiredFactTypes,
            messages: this.mapFactTypeDetails(executionResult.trace.root.factTypeDetails)
        };
    }


    // private mapConclusionValues(conclusions: any) {
    //     return Object.keys(conclusions)
    //         .filter(key => !NON_CONCLUSION_KEYS.has(key))
    //         .reduce((map, key) => {
    //             map[key] = conclusions[key];
    //             return map;
    //         }, {});
    // }

    private mapFactTypeDetails(factTypeDetails: FactTypeDetails) {
        let messages: MessagesMap = {};

        Object.keys(factTypeDetails)
            .forEach(key => {
                messages[key] = this.flatMap(
                    factTypeDetails[key].rowHits,
                    r => this.mapMessages(r.messages)
                );
            });

        return messages;
    }

    private mapMessages(messages: Messages) {
        if (!messages) {
            return [];
        }

        return Object.keys(messages)
            .map(key => {
                return {category: key, text: messages[key]};
            });
    }

    private flatMap<T, TResult>(array: T[], selector: (item: T) => TResult[]) {
        let result: TResult[] = [];
        array.forEach(item => {
            result = result.concat(selector(item));
        });
        return result;
    }

    private extractErrorMessage(error): any {
        let _error: any;
        if (typeof error == 'string') {
            _error = {error: error};
        }
        else {
            _error = JSON.parse(error);

            if (_error.message)
                _error = {error: _error.message};
            else
                _error = {error: _error};
        }
        return _error;
    }


    getFlowSchemaFromRequiredFTs(requiredFTs: any[], manifest: any) {

        return this.transformationService.transformFTsToFormSchema(requiredFTs, manifest);
    }
}
