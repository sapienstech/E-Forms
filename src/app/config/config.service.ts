import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ProcessConfig } from './config.model';

@Injectable()
export class ConfigService {
    constructor(private http: Http) {
    }

    getProcessConfig() {
        return this.http.get('/api/process')
            .map(response => response.json() as ProcessConfig[]);
    }

    getManifest(flowId) {
        return this.http.get('api/flowManifests/' + flowId).map(response => response.json());
    }

    getLayout(flowId){
        return this.http.get('api/layouts/' + flowId).map(response => response.json());
    }
}
