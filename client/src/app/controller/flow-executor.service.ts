import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {
    ExecutionInput,
    ArtifactKey,
    ExecutionResult,
    FactTypeDetails,
    Messages
} from '../model/execution';

const NON_CONCLUSION_KEYS = new Set(['factTypeDetails', 'executionKeyValues']);

export interface ExecutionResponse {
    data: any;
    messages: MessagesMap;
}

interface MessagesMap {
    [name: string]: { category: string, text: string }[];
}

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
                artifactKey,
                effectiveDate: '2017'
            },
            executionInput: {
                root: data
            },
            executionConfiguration: null
        };

        return result;
    }

    transformExecutionResult(executionResult: ExecutionResult) {
        // TODO: Handle list value better

        let root = executionResult.trace.root;

        return {
            data: this.mapConclusionValues(root),
            messages: this.mapFactTypeDetails(root.factTypeDetails)
        };
    }

    private mapConclusionValues(conclusions: any) {
        return Object.keys(conclusions)
            .filter(key => !NON_CONCLUSION_KEYS.has(key))
            .reduce((map, key) => {
                map[key] = conclusions[key];
                return map;
            }, {});
    }

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
}
