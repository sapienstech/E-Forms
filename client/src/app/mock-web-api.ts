import {
    InMemoryDbService,
    ResponseInterceptor,
    STATUS
} from 'angular-in-memory-web-api';

import { ExecutionInput } from './model';

declare function require(id: string): any;

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
            flow: {
                    name:"OnePersistentManyConcs",
                    releaseName:"testUiGenerator",
                    tagName:"tag2",
                    artifactType:"FLOW"
        }},
        {
            type: 'ui',
            flow: {
                "name":"TenPersistentOneResponse",
                "releaseName":"testUiGenerator",
                "tagName":"tag2",
                "artifactType":"FLOW"
            },
            validation: {
                conclusion: 'isValid',
                invalid: 'invalid'
            }
        },
        {
            type: 'async',
            flow: {
                "name":"TenPersistentOneResponse",
                "releaseName":"testUiGenerator",
                "tagName":"tag2",
                "artifactType":"FLOW"
            }
        }]
    },
    {
        id: 'process2',
        title: 'Process 2',
        description: 'Example process using Service Tasks',
        steps: [{
            type: 'ui',
            flow: {
                name:"ff1",
                releaseName:"project1",
                tagName:"shaul",
                artifactType:"FLOW"
            }}
           ]
    }
];

// const EXECUTION_RESULTS = {
//     'OnePersistentManyConcs': require('../data/OnePersistentManyConcs.result.json'),
//     'TenPersistentOneResponse': require('../data/TenPersistentOneResponse.result.json'),
// };

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

    // post(args: HttpMethodInterceptorArgs) {
    //     let request = args.requestInfo.req.json() as ExecutionInput;
    //     let flow = request.executableKey.artifactKey.name;
    //
    //     return createObservableResponse(args.requestInfo.req, new ResponseOptions({
    //         body: EXECUTION_RESULTS[flow],
    //         status: STATUS.OK
    //     }));
    // }
}
