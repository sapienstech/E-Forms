
import { FlowExecutorService } from './flow-executor.service';
import * as _ from 'lodash';
import { ArtifactKey } from '../model/execution';

describe('Flow Executor Service', () => {
    let service: FlowExecutorService;

    beforeEach(() => {
        service = new FlowExecutorService(null);
    });

    it('should transform form inputs to DE execution inputs', () => {
        let formInputs = {
            cond1: '1',
            cond2: '2',
            cond4: '4'
        };

        let deInputs = {
            executableKey: {
                artifactKey: {
                    name: 'flow1',
                    releaseName: undefined,
                    tagName: undefined,
                    artifactType: 'FLOW'
                }
            },
            executionInput: {
                'root': {
                    cond1: '1',
                    cond2: '2',
                    cond4: '4'
                }
            },
            executionConfiguration: null
        };
        let ak :ArtifactKey= {
            name: 'flow1',
            releaseName: undefined,
            tagName: undefined,
            artifactType: 'FLOW'
        };
        let ei = service.transformExecutionInput(ak, formInputs);
        let equal = _.isEqual(ei, deInputs);
        expect(equal).toBeTruthy();
    });


    it('should transform from DE Execution results to form inputs', () => {
        let executionResults: any = {
            "trace": {
                "root": {
                    "executionKeyValues": {},
                    "cond1": "value1",
                    "cond4": "value4",
                    "cond3": "value3",
                    "cond2": "value2",
                    "cond5": null,
                    "finalConc": "2",
                    "persistent": null,
                    "factTypeDetails": {
                        "finalConc": {
                            "conclusionValue": "2",
                            "rowHits": [{
                                "hashId": "1018060",
                                "hash": "60c009aab69d3d63d4a077f3d02119dc"
                            }],
                            "resultComparison": null
                        },
                        "cond4": {
                            "conclusionValue": "value4",
                            "rowHits": [{
                                "hashId": "1018002",
                                "hash": "9be934857cbcba459143810abf42c19e"
                            }],
                            "resultComparison": null
                        },
                        "cond3": {
                            "conclusionValue": "value3",
                            "rowHits": [{
                                "hashId": "1017996",
                                "hash": "e9d160017a3ef9071d3aba6f5edd9c99"
                            }],
                            "resultComparison": null
                        },
                        "cond2": {
                            "conclusionValue": "value2",
                            "rowHits": [{
                                "hashId": "1017990",
                                "hash": "d61c0984e1dfa4ef8866693bb78aa826"
                            }],
                            "resultComparison": null
                        },
                        "cond1": {
                            "conclusionValue": "value1",
                            "rowHits": [{
                                "hashId": "1017984",
                                "hash": "f60164f8ff64513119b9f3655a8d0862"
                            }],
                            "resultComparison": null
                        }
                    }
                }
            },
            "executedVersion": "1.0",
            "expectedResultsMatchActualResults": null,
            "executionResults": {
                "finalConc": {
                    "Base": {
                        "1.0": [{
                            "conclusion": {
                                "conclusionName": "finalConc",
                                "conclusionValue": "2",
                                "rowHits": [{
                                    "hashId": "1018060",
                                    "hash": "60c009aab69d3d63d4a077f3d02119dc"
                                }],
                                "resultComparison": null
                            },
                            "executedVersion": "1.0",
                            "trace": {
                                "root": {
                                    "executionKeyValues": {},
                                    "cond3": "value3",
                                    "finalConc": "2",
                                    "cond5": null,
                                    "cond4": "value4",
                                    "persistent": null,
                                    "cond2": "value2",
                                    "cond1": "value1",
                                    "factTypeDetails": {
                                        "finalConc": {
                                            "conclusionValue": "2",
                                            "rowHits": [{
                                                "hashId": "1018060",
                                                "hash": "60c009aab69d3d63d4a077f3d02119dc"
                                            }],
                                            "resultComparison": null
                                        },
                                        "cond4": {
                                            "conclusionValue": "value4",
                                            "rowHits": [{
                                                "hashId": "1018002",
                                                "hash": "9be934857cbcba459143810abf42c19e"
                                            }],
                                            "resultComparison": null
                                        },
                                        "cond3": {
                                            "conclusionValue": "value3",
                                            "rowHits": [{
                                                "hashId": "1017996",
                                                "hash": "e9d160017a3ef9071d3aba6f5edd9c99"
                                            }],
                                            "resultComparison": null
                                        },
                                        "cond2": {
                                            "conclusionValue": "value2",
                                            "rowHits": [{
                                                "hashId": "1017990",
                                                "hash": "d61c0984e1dfa4ef8866693bb78aa826"
                                            }],
                                            "resultComparison": null
                                        },
                                        "cond1": {
                                            "conclusionValue": "value1",
                                            "rowHits": [{
                                                "hashId": "1017984",
                                                "hash": "f60164f8ff64513119b9f3655a8d0862"
                                            }],
                                            "resultComparison": null
                                        }
                                    }
                                }
                            },
                            "idInFlow": "TaskNode_0_4",
                            "expectedResultsMatchActualResults": null,
                            "name": null,
                            "executedViewName": "Base",
                            "executableKey": null,
                            "executionKeyValues": null,
                            "profileStopWatch": []
                        }]
                    }
                },
                "testServiceTask": {
                    "serviceTaskName": "testServiceTask",
                    "inputFts": {
                        "ROOT": {
                            "executionKeyValues": {},
                            "persistent": null,
                            "factTypeDetails": {}
                        }
                    },
                    "outputFts": {
                        "ROOT": {
                            "executionKeyValues": {},
                            "cond5": null,
                            "cond4": null,
                            "cond3": null,
                            "cond2": null,
                            "cond1": null,
                            "factTypeDetails": {}
                        }
                    }
                }
            },
            "executionKeyValues": {},
            "profileStopWatch": [{
                "operation": "Execute Flow (Execution Manager)",
                "elapsedTime": 264
            }],
            "executedTransitions": null
        };

        let formInputs = {
            "cond1": "value1",
            "cond4": "value4",
            "cond3": "value3",
            "cond2": "value2",
            "cond5": null,
            "finalConc": "2",
            "persistent": null,
        };

        let ei = service.transformExecutionResult(executionResults);
        let equal = _.isEqual(ei.data, formInputs);
        expect(equal).toBeTruthy();
    });

});

