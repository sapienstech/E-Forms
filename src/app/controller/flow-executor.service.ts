import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FlowExecutorService {
    constructor(private http: Http) {
    }

    execute(flowId: string, input) {
        // TODO: Prepare JSON input
        return this.http.post(`/flow/${ flowId }`, input);
        // TODO: Parse JSON output
    }
}
