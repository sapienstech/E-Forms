import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ExecutionInput, ArtifactKey } from '../model/execution';

@Injectable()
export class FlowExecutorService {
    constructor(private http: Http) {
    }

    execute(flowId: string, input) {
        let executionInputs = this.transformFormInputsToDEExecutionInputs(flowId, input);
        return this.http.post(`/flow/${ flowId }`, executionInputs)
            .map(r => this.transformDEExecutionResultsToFormInputs(r));
    }

    transformFormInputsToDEExecutionInputs(flowId: string, input) {
        // let inputFields = Object.keys(input.value);
        // let ioWrapper = [];
        // let executionInput = { rootGroup: { IoGroupInstances: ioWrapper } };
        // for (let field of inputFields) {
        //     let ft = <IoFactType>{};
        //     ft.factTypeName = field;
        //     ft.values = [input.value[field]];
        //     ft.isConclusionValues = false;
        //     ioWrapper.push({ IoFactTypes: [ft] });
        // }
        // return executionInput;

        let artifactKey: ArtifactKey = {
            name: flowId,
            releaseName: undefined,
            tagName: undefined,
            artifactType: 'FLOW'
        };

        let result: ExecutionInput = {
            executableKey: {
                artifactKey
            },
            executionInput: {
                rootGroup: {
                    IoGroupInstances: Object.keys(input)
                        .map(key => {
                            return {
                                IoFactTypes: [
                                    {
                                        factTypeName: key,
                                        values: [input[key]],
                                        isConclusionValues: false
                                    }
                                ]
                            };
                        })
                }
            },
            executionConfiguration: null
        };

        return result;
    }

    public transformDEExecutionResultsToFormInputs(flowResults) {
        let results = {};

        for (let result of flowResults.executionResults) {
            if (result.conclusion.values) {
                results[result.conclusion.factTypeName] = result.conclusion.values;
            }
        }

        return results;
    }
}
