import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Manifest, FormLayout } from '../model';
import { ProcessConfig } from './config.model';
import { TransformationService } from './transformation.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
    constructor(
        private transformationService: TransformationService,
        private http: Http
    ) {
    }

    getProcesses() {
        return this.http.get(environment.de + '/processes')
            .map(response => response.json() as ProcessConfig[]);
    }

    getProcess(id: string) {
        return this.http.get(`/api/process/${ id }`)
            .map(response => response.json() as ProcessConfig);
    }

    getFormSchema(flowId) {
        return Observable.combineLatest(
            this.getManifest(flowId),
            this.getLayout(flowId),
            (m, l) => this.transformationService.mergeLayoutWithSchema(m, l)
        );
    }

    getLayout(flowId: string) {
        return this.http.get(`api/layout/${ flowId }`)
            .map(response => response.json() as FormLayout)
            .catch(() => Observable.of(undefined as FormLayout));
    }

    private getManifest(flowId: string) {
        return this.http.get(`/api/manifest/${ flowId }`)
            .map(response => response.json() as Manifest)
            .map(manifest => this.transformationService.transformToFormSchema(manifest));
    }
}
