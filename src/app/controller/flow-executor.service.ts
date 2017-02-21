import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {
    ExecutionInput,
    ArtifactKey,
    ExecutionResults,
    IoFactType,
    Message
} from '../model/execution';

export interface ExecutionResponse {
    data: any;
    messages: {
        [name: string]: Message[];
    };
}

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
        // TODO: Handle list value better

        let response: ExecutionResponse = {
            data: {},
            messages: {}
        };

        return executionResult.executionResults
            .map(r => r.conclusion)
            .filter(this.isValidExecutionResult)
            .reduce(this.mapExecutionResult, response);
    }

    private isValidExecutionResult(conclusion: IoFactType) {
        return conclusion
            && conclusion.isConclusionValues
            && !!conclusion.values;
    }

    private mapExecutionResult(response: ExecutionResponse, conclusion: IoFactType) {
        let value = conclusion.values.join(',');
        response.data[conclusion.factTypeName] = value;

        if (conclusion.rowHit && conclusion.rowHit.message) {
            response.messages[conclusion.factTypeName] = conclusion.rowHit.message;
        }

        return response;
    }
}
