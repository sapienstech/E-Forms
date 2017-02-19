
import { FlowExecutorService } from './flow-executor.service';
import * as _ from 'lodash';

describe('Flow Executor Service', () => {
    let service: FlowExecutorService;

    beforeEach(() => {
        service = new FlowExecutorService(null);
    });


    it('should transform form inputs to DE execution inputs', () => {
        let formInputs = {value:{
            cond1:'1',
            cond2:'2',
            cond4:'4'
        }};
        let deInputs = {
            "rootGroup":{
                "IoGroupInstances": [
                    {
                        "IoFactTypes": [
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "cond1",
                                "isConclusionValues": false
                            }
                        ]
                    },
                    {
                        "IoFactTypes": [
                            {
                                "values": [
                                    "2"
                                ],
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            }
                        ]
                    },
                    {
                        "IoFactTypes": [
                            {
                                "values": [
                                    "4"
                                ],
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            }
                        ]
                    }
                ]
            }
        };
        let ei = service.transformFormInputsToDEExecutionInputs(formInputs);
        let equal = _.isEqual(ei,deInputs);
        expect(equal).toBeTruthy();
    });


    it('should transform from DE Execution results to form inputs', () => {
        let executionResults = {
            "executionResults": [
                {
                    "conclusion": {
                        "values": [
                            "1"
                        ],
                        "factTypeName": "conc1",
                        "rowHit": [
                            {
                                "rowId": "1016259",
                                "message": [
                                    {
                                        "category": "Informational",
                                        "text": "this is an informational message"
                                    },
                                    {
                                        "category": "Critical",
                                        "text": "this is a critical message"
                                    }
                                ],
                                "rowHash": "13c0e0782d1fb08d670f188abee16457"
                            }
                        ],
                        "isConclusionValues": true
                    },
                    "trace": {
                        "IoGroupInstances": [
                            {
                                "IoFactType": [
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "cond1",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "conc1",
                                        "rowHit": [
                                            {
                                                "rowId": "1016259",
                                                "message": [
                                                    {
                                                        "category": "Informational",
                                                        "text": "this is an informational message"
                                                    },
                                                    {
                                                        "category": "Critical",
                                                        "text": "this is a critical message"
                                                    }
                                                ],
                                                "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                            }
                                        ],
                                        "isConclusionValues": true
                                    }
                                ],
                                "IoFactTypes": [
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "cond1",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "conc1",
                                        "rowHit": [
                                            {
                                                "rowId": "1016259",
                                                "message": [
                                                    {
                                                        "category": "Informational",
                                                        "text": "this is an informational message"
                                                    },
                                                    {
                                                        "category": "Critical",
                                                        "text": "this is a critical message"
                                                    }
                                                ],
                                                "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                            }
                                        ],
                                        "isConclusionValues": true
                                    }
                                ]
                            },
                            {},
                            {}
                        ],
                        "IoGroupInstance": [
                            {
                                "IoFactType": [
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "cond1",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "conc1",
                                        "rowHit": [
                                            {
                                                "rowId": "1016259",
                                                "message": [
                                                    {
                                                        "category": "Informational",
                                                        "text": "this is an informational message"
                                                    },
                                                    {
                                                        "category": "Critical",
                                                        "text": "this is a critical message"
                                                    }
                                                ],
                                                "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                            }
                                        ],
                                        "isConclusionValues": true
                                    }
                                ],
                                "IoFactTypes": [
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "cond1",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "values": [
                                            "1"
                                        ],
                                        "factTypeName": "conc1",
                                        "rowHit": [
                                            {
                                                "rowId": "1016259",
                                                "message": [
                                                    {
                                                        "category": "Informational",
                                                        "text": "this is an informational message"
                                                    },
                                                    {
                                                        "category": "Critical",
                                                        "text": "this is a critical message"
                                                    }
                                                ],
                                                "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                            }
                                        ],
                                        "isConclusionValues": true
                                    }
                                ]
                            },
                            {},
                            {}
                        ]
                    },
                    "executedVersion": "1.0",
                    "executedViewName": "Base",
                    "idInFlow": "TaskNode_0_4"
                },
                {
                    "conclusion": {
                        "factTypeName": "conc2",
                        "isConclusionValues": false
                    },
                    "trace": {
                        "IoGroupInstances": [
                            {
                                "IoFactType": [
                                    {
                                        "factTypeName": "cond2",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "factTypeName": "conc2",
                                        "isConclusionValues": false
                                    }
                                ],
                                "IoFactTypes": [
                                    {
                                        "factTypeName": "cond2",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "factTypeName": "conc2",
                                        "isConclusionValues": false
                                    }
                                ]
                            },
                            {},
                            {}
                        ],
                        "IoGroupInstance": [
                            {
                                "IoFactType": [
                                    {
                                        "factTypeName": "cond2",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "factTypeName": "conc2",
                                        "isConclusionValues": false
                                    }
                                ],
                                "IoFactTypes": [
                                    {
                                        "factTypeName": "cond2",
                                        "isConclusionValues": false
                                    },
                                    {
                                        "factTypeName": "conc2",
                                        "isConclusionValues": false
                                    }
                                ]
                            },
                            {},
                            {}
                        ]
                    },
                    "executedVersion": "1.0",
                    "executedViewName": "Base",
                    "idInFlow": "TaskNode_0_5"
                }
            ],
            "trace": {
                "IoGroupInstances": [
                    {
                        "IoFactType": [
                            {
                                "factTypeName": "ListAmount",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "cond1",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput1",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "conc1",
                                "rowHit": [
                                    {
                                        "rowId": "1016259",
                                        "message": [
                                            {
                                                "category": "Informational",
                                                "text": "this is an informational message"
                                            },
                                            {
                                                "category": "Critical",
                                                "text": "this is a critical message"
                                            }
                                        ],
                                        "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                    }
                                ],
                                "isConclusionValues": true
                            },
                            {
                                "factTypeName": "cond3",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc3",
                                "isConclusionValues": false
                            }
                        ],
                        "IoFactTypes": [
                            {
                                "factTypeName": "ListAmount",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "cond1",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput1",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "conc1",
                                "rowHit": [
                                    {
                                        "rowId": "1016259",
                                        "message": [
                                            {
                                                "category": "Informational",
                                                "text": "this is an informational message"
                                            },
                                            {
                                                "category": "Critical",
                                                "text": "this is a critical message"
                                            }
                                        ],
                                        "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                    }
                                ],
                                "isConclusionValues": true
                            },
                            {
                                "factTypeName": "cond3",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc3",
                                "isConclusionValues": false
                            }
                        ]
                    },
                    {
                        "IoFactType": [
                            {
                                "values": [
                                    "2"
                                ],
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            }
                        ],
                        "IoFactTypes": [
                            {
                                "values": [
                                    "2"
                                ],
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            }
                        ]
                    },
                    {
                        "IoFactType": [
                            {
                                "values": [
                                    "4"
                                ],
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            }
                        ],
                        "IoFactTypes": [
                            {
                                "values": [
                                    "4"
                                ],
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            }
                        ]
                    }
                ],
                "IoGroupInstance": [
                    {
                        "IoFactType": [
                            {
                                "factTypeName": "ListAmount",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "cond1",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput1",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "conc1",
                                "rowHit": [
                                    {
                                        "rowId": "1016259",
                                        "message": [
                                            {
                                                "category": "Informational",
                                                "text": "this is an informational message"
                                            },
                                            {
                                                "category": "Critical",
                                                "text": "this is a critical message"
                                            }
                                        ],
                                        "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                    }
                                ],
                                "isConclusionValues": true
                            },
                            {
                                "factTypeName": "cond3",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc3",
                                "isConclusionValues": false
                            }
                        ],
                        "IoFactTypes": [
                            {
                                "factTypeName": "ListAmount",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc2",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc4",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "cond1",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "testOutput1",
                                "isConclusionValues": false
                            },
                            {
                                "values": [
                                    "1"
                                ],
                                "factTypeName": "conc1",
                                "rowHit": [
                                    {
                                        "rowId": "1016259",
                                        "message": [
                                            {
                                                "category": "Informational",
                                                "text": "this is an informational message"
                                            },
                                            {
                                                "category": "Critical",
                                                "text": "this is a critical message"
                                            }
                                        ],
                                        "rowHash": "13c0e0782d1fb08d670f188abee16457"
                                    }
                                ],
                                "isConclusionValues": true
                            },
                            {
                                "factTypeName": "cond3",
                                "isConclusionValues": false
                            },
                            {
                                "factTypeName": "conc3",
                                "isConclusionValues": false
                            }
                        ]
                    },
                    {
                        "IoFactType": [
                            {
                                "values": [
                                    "2"
                                ],
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            }
                        ],
                        "IoFactTypes": [
                            {
                                "values": [
                                    "2"
                                ],
                                "factTypeName": "cond2",
                                "isConclusionValues": false
                            }
                        ]
                    },
                    {
                        "IoFactType": [
                            {
                                "values": [
                                    "4"
                                ],
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            }
                        ],
                        "IoFactTypes": [
                            {
                                "values": [
                                    "4"
                                ],
                                "factTypeName": "cond4",
                                "isConclusionValues": false
                            }
                        ]
                    }
                ]
            },
            "profileStopWatch": [
                {
                    "operation": "Execute Flow (Execution Manager)",
                    "elapsedTime": 4
                }
            ],
            "executedVersion": "1.0"
        };
        let formInputs = {conc1: '1'};
        let ei = service.transformDEExecutionResultsToFormInputs(executionResults);
        let equal = _.isEqual(ei,formInputs);
        expect(equal).toBeTruthy();
    });

});

