import { ResponseOptions } from '@angular/http';
import {
    InMemoryDbService,
    HttpMethodInterceptorArgs,
    ResponseInterceptor,
    createObservableResponse,
    STATUS
} from 'angular-in-memory-web-api';

import { ExecutionInput } from './model';

const FLOWS = [
    { id: '123', data: {} }
];

const PROCESSES = [
    { title: 'Process 1', steps: [] },
    {
        title: 'Process 2',
        description: 'Process 2 Description',
        steps: [
            {
                flow: 'flow1',
                title: 'Flow 1 - Step 1'
            }
        ]
    }
];

const EXECUTION_RESULTS = {
};

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
            flows: FLOWS,
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
