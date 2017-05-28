import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ArtifactInfo } from '../../types/types';
import { IManagementService } from './IManagementService';

@Injectable()
export class ManagementService implements IManagementService {

    constructor(private http: Http) {
    }

    getFlowSchema(flow: any, de: any): Observable<any> {
        let requestOptionArgs = {
            body: {
                artifactKey: {
                    name: flow.name,
                    releaseName: flow.releaseName,
                    tagName: flow.tagName,
                    artifactType: 'FLOW'
                },
                de: de.url
            }
        };
        return this.http.post(environment.de + '/manifest', requestOptionArgs).map(r => r.json());
    }

    public getDEsInfo(): Observable<any[]> {
        return this.http.get(environment.de + '/de-servers').map(r => r.json());
    }

    public getDEHealthCheck(de: any): Observable<any> {
        return this.http.get(environment.de + '/heartbeat?url=' + de.url).map(r => {
            return r.json()
        });
    }

    public getFlows(de: any): Observable<ArtifactInfo[]> {
        return this.http.get(environment.de + '/flows?url=' + de.url).map(r => r.json());
    }

    public execute(key: any, de: any): Observable<any> {
        let requestOptionArgs = {
            body: key
        };
        return this.http.post(environment.de + '/execute?url=' + de.url, requestOptionArgs).map(r => r.json());

    }
}
