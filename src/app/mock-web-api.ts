import { ResponseOptions } from '@angular/http';
import {
    InMemoryDbService,
    HttpMethodInterceptorArgs,
    ResponseInterceptor,
    createObservableResponse,
    STATUS
} from 'angular-in-memory-web-api';

import { ExecutionInput } from './model';

const FLOW_MANIFESTS = [
    { id: '1000', data: require('../data/manifest/form1.json') },
    { id: '2000', data: require('../data/manifest/form2.json') },
    { id: '3000', data: require('../data/manifest/form3.json') },
];

const PROCESSES = [
    { title: 'Process 1', steps: [] },
    {
        title: 'Process 2',
        description: 'Process 2 Description',
        steps: [
            {
                flow: '1000',
                title: 'Flow 1 - Step 1'
            },
            {
                flow: '2000',
                title: 'Flow 2 - Step 2'
            },
            {
                flow: '3000',
                title: 'Flow 3 - Step 3'
            }
        ]
    }
];

const EXECUTION_RESULTS = [
    {flow:'1000',result: require('../data/execution-result/result1.json')},
    {flow:'2000',result: require('../data/execution-result/result2.json')},
    {flow:'3000',result: require('../data/execution-result/result3.json')}
];

export class MockWebApi extends InMemoryDbService {
    private responseInterceptor: ResponseInterceptor;

    constructor() {
        super();

        this.responseInterceptor = (res) => {
            let body = (res.body as any).data;
            return res.merge({ body });
        };
    }

    createDb() {
        return {
            flowManifests: FLOW_MANIFESTS,
            process: PROCESSES
        };
    }

    post(args: HttpMethodInterceptorArgs) {
        let request = args.requestInfo.req.json() as ExecutionInput;
        let flow = request.executableKey.artifactKey.name;

        return createObservableResponse(args.requestInfo.req, new ResponseOptions({
            body: EXECUTION_RESULTS[flow],
            status: STATUS.OK
        }));
    }
}
