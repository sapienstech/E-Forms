import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Manifest, FormLayout } from '../model';
import { ProcessConfig } from './config.model';

import { TransformationService } from './transformation.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {
    constructor(
        private transformationService: TransformationService,
        private http: Http
    ) {
    }

    getProcessConfig() {
        return this.http.get('/api/process')
            .map(response => response.json() as ProcessConfig[]);
    }

    getFormSchema(flowId) {
        let manifestObs = this.http.get('api/flowManifests/' + flowId).
                                    map(response => response.json() as Manifest).
                                    map(manifest=>this.transformationService.transformToFormSchema(manifest));

        let layoutObs = this.http.get('api/layouts/' + flowId).
                                  map(response => response.json() as FormLayout);

        return Observable.combineLatest(manifestObs , layoutObs,(m,l)=> this.transformationService.mergeLayoutWithSchema(m,l));

    }

    getLayout(flowId) {
        return this.http.get('api/layouts/' + flowId)
            .map(response => response.json() as FormLayout);
    }


}
