import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ExecutionInput, ArtifactKey, ExecutionResult } from '../model/execution';

@Injectable()
export class FlowExecutorService {
    constructor(private http: Http) {
    }

    execute(flowId: string, data: any) {
        let executionInputs = this.transformExecutionInput(flowId, data);

        return this.http.post(`/flow/${ flowId }`, executionInputs)
            .map(response => response.json() as ExecutionResult)
            .map(result => this.transformExecutionResult(result));
    }

    transformExecutionInput(flowId: string, data: any) {
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
                    IoGroupInstances: Object.keys(data)
                        .map(key => {
                            return {
                                IoFactTypes: [
                                    {
                                        factTypeName: key,
                                        values: [data[key]],
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

    public transformExecutionResult(executionResult: ExecutionResult) {
        let results = {};

        // TODO: Handle validation messages
        // TODO: Handle list value

        for (let result of executionResult.executionResults) {
            if (result.conclusion.values) {
                results[result.conclusion.factTypeName] = result.conclusion.values.join(',');
            }
        }

        return results;
    }
}
