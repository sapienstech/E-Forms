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
                    IoGroupInstances: Object.keys(input.value)
                        .map(key => {
                            return {
                                IoFactTypes: [
                                    {
                                        factTypeName: key,
                                        values: [input.value[key]],
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
                results[result.conclusion.factTypeName] = result.conclusion.values.join(',');
            }
        }

        return results;
    }
}
