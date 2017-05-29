import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ArtifactInfo } from '../../types/types';
import { IManagementService } from './IManagementService';
import { EXECUTE_URL, GET_FLOWS_URL, MANIFEST_URL } from '../consts';
import { UtilsService } from '../../services/utils.service';

@Injectable()
export class LocalManagementService implements IManagementService {

    getFlowSchema(flow: any): Observable<any> {
        let requestOptionArgs = {
            artifactKey: {
                name: flow.name,
                releaseName: flow.releaseName,
                tagName: flow.tagName,
                artifactType: 'FLOW'
            }
        };
        return this.http.post(this.localDEUrl + MANIFEST_URL, requestOptionArgs).map(r => r.json());

    }

    private localDEUrl: string;

    constructor(private http: Http,private utilsService :UtilsService ) {
        this.localDEUrl = this.utilsService.getLocalUrl();
    }

    public getDEsInfo(): Observable<any[]> {
        return null;
    }

    public getDEHealthCheck(_de?: any): Observable<any> {
        return null;
    }

    public getFlows(_de?: any): Observable<ArtifactInfo[]> {
        return this.http.get(this.localDEUrl + GET_FLOWS_URL).map(r => r.json());

    }

    public execute(key: any): Observable<any> {
        let requestOptionArgs =key;
        return this.http.post(this.localDEUrl + EXECUTE_URL, requestOptionArgs).map(r => r.json());

    }


}
