import { Observable } from 'rxjs';
import { ArtifactInfo } from '../../types/types';

export interface IManagementService {

    getDEsInfo(): Observable<any[]>;

    getDEHealthCheck(de?: any): Observable<any>;

    getFlows(de?: any): Observable<ArtifactInfo[]>;

    execute(key: any, de?: any): Observable<any>;

    getFlowSchema(flow: any, de?: any): Observable<any> ;
}
