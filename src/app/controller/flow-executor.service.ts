import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ExecutionInput, ArtifactKey, ExecutionResults, ExecutionResult } from '../model/execution';

@Injectable()
export class FlowExecutorService {
    constructor(private http: Http) {
    }

    execute(flowId: string, data: any) {
        let executionInputs = this.transformExecutionInput(flowId, data);

        return this.http.post(`/flow/${ flowId }`, executionInputs)
            .map(response => response.json() as ExecutionResults)
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

    transformExecutionResult(executionResult: ExecutionResults) {
        // TODO: Handle validation messages
        // TODO: Handle list value better

        return executionResult.executionResults
            .filter(this.isValidExecutionResult)
            .reduce(this.mapExecutionResult, {});
    }

    private isValidExecutionResult(result: ExecutionResult) {
        return result.conclusion
            && result.conclusion.isConclusionValues
            && result.conclusion.values;
    }

    private mapExecutionResult(map: any, result: ExecutionResult) {
        map[result.conclusion.factTypeName] = result.conclusion.values.join(',');
        return map;
    }
}
