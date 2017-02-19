
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

});

