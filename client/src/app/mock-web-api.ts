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
    {
        id: 'OnePersistentManyConcs',
        data: require('../data/OnePersistentManyConcs.manifest.json')
    },
    {
        id: 'TenPersistentOneResponse',
        data: require('../data/TenPersistentOneResponse.manifest.json')
    },
];

const LAYOUTS = [];

const PROCESSES = [
    { id: 'process-1', title: 'Process 1', steps: [] },
    {
        id: 'example-process',
        title: 'Example Process',
        description: 'Example process using Mock data',
        steps: [{
            type: 'ui',
            flow: 'OnePersistentManyConcs'
        },
        {
            type: 'ui',
            flow: 'TenPersistentOneResponse',
            validation: {
                conclusion: 'isValid',
                invalid: 'invalid'
            }
        },
        {
            type: 'async',
            flow: 'TenPersistentOneResponse'
        }]
    }
];

const EXECUTION_RESULTS = {
    'OnePersistentManyConcs': require('../data/OnePersistentManyConcs.result.json'),
    'TenPersistentOneResponse': require('../data/TenPersistentOneResponse.result.json'),
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
            if (body.hasOwnProperty('id') && body.hasOwnProperty('data')) {
                body = body.data;
            }
            return res.merge({ body });
        };
    }

    createDb() {
        return {
            manifest: FLOW_MANIFESTS,
            process: PROCESSES,
            layout: LAYOUTS
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
