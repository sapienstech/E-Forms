import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ArtifactInfo } from '../../types/types';
import { IManagementService } from './IManagementService';
import { UtilsService } from '../../services/utils.service';
import {DiExecutionInput} from "../../model";
import {DeDetails} from "../di-integration/di-integration.component";

@Injectable()
export class ManagementService implements IManagementService {

    constructor(private http: Http,private utilsService : UtilsService) {
    }

    getFlowSchema(flow: any, de: any): Observable<any> {
        let requestOptionArgs = {
            body: {
                artifactKey: {
                    name: flow.name,
                    releaseName: flow.releaseName,
                    tagName: flow.tagName,
                    artifactType: 'FLOW'
                },
                de: de.url
            }
        };
        return this.http.post(this.utilsService.getLocalUrl() + '/manifest', requestOptionArgs).map(r => r.json());
    }

    public getDEsInfo(): Observable<any[]> {
        return this.http.get(this.utilsService.getLocalUrl() + '/de-servers').map(r => r.json());
    }

    public getDEHealthCheck(de: any): Observable<any> {
        return this.http.get(this.utilsService.getLocalUrl()+ '/heartbeat?url=' + de.url).map(r => {
            return r.json()
        });
    }

    public getFlows(de: any): Observable<ArtifactInfo[]> {
        return this.http.get(this.utilsService.getLocalUrl()+ '/flows?url=' + de.url).map(r => r.json());
    }

    public execute(key: any, de: any): Observable<any> {
        let requestOptionArgs = {
            body: key
        };
        return this.http.post(this.utilsService.getLocalUrl() + '/execute?url=' + de.url, requestOptionArgs).map(r => r.json());

    }

    executeDi(inputs: DiExecutionInput, deDetails: DeDetails): Observable<any> {

        let requestOptionArgs = {
            body: inputs
        };

        return this.http.post(this.utilsService.getLocalUrl() + "/executeDi?url=" + deDetails.url, requestOptionArgs).map(response => response.json());
    }
}
