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
    { id: '1000', data: require('../data/real/flow-manifest/manifest1.json') },
    { id: '2000', data: require('../data/real/flow-manifest/manifest2+3.json') },
    { id: '3000', data: require('../data/real/flow-manifest/manifest2+3.json') },
];

const LAYOUTS = [
    // { id: '1000', data: null },
    // { id: '2000', data: null },
    // { id: '3000', data: null },
];

const PROCESSES = [
    { title: 'Process 1', steps: [] },
    {
        title: 'Process 2',
        description: 'Process 2 Description',
        steps: [{
            type: 'ui',
            flow: '1000',
            title: 'Flow 1 - Step 1'
        },
        {
            type: 'ui',
            flow: '2000',
            title: 'Flow 2 - Step 2'
        },
        {
            type: 'execute',
            flow: '3000',
            title: 'Flow 3 - Step 3'
        }]
    },
    {
        title: 'Process 3',
        description: 'Process 3 Description',
        steps: [{
            type: 'ui',
            flow: '1000',
            title: 'Flow 1 - Step 1'
        }]
    }
];

const EXECUTION_RESULTS = {
    '1000': require('../data/real/execution-result/result1.json'),
    '2000': require('../data/real/execution-result/result2.json'),
    '3000': require('../data/real/execution-result/result3.json')
};

export class MockWebApi extends InMemoryDbService {
    private responseInterceptor: ResponseInterceptor;

    constructor() {
        super();

        this.responseInterceptor = (res) => {
            if (res.status !== STATUS.OK) {
                return res;
            }

            let body = (res.body as any).data;
            if (body.hasOwnProperty('id')) {
                body = body.data;
            }
            return res.merge({ body });
        };
    }

    createDb() {
        return {
            flowManifests: FLOW_MANIFESTS,
            process: PROCESSES,
            layouts: LAYOUTS
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
