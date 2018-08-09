import { Observable } from 'rxjs';
import { ArtifactInfo } from '../../types/types';
import {DiExecutionInput} from "../../model";
import {DeDetails} from "../di-integration/di-integration.component";

export interface IManagementService {

    getDEsInfo(): Observable<any[]>;

    getDEHealthCheck(de?: any): Observable<any>;

    getFlows(de?: any): Observable<ArtifactInfo[]>;

    execute(key: any, de?: any): Observable<any>;

    executeDi(inputs: DiExecutionInput, deDetails: DeDetails): Observable<any>;

    getFlowSchema(flow: any, de?: any): Observable<any> ;

    callAlis(json: string): Observable<string>;
}
