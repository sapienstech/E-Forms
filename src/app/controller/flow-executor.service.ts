import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ExecutionInput, IoFactType } from '../model/execution';

@Injectable()
export class FlowExecutorService {
    constructor(private http: Http) {
    }

    execute(flowId: string, input) {

        // TODO: Prepare JSON input
        let executionInputs = this.transformFormInputsToDEExecutionInputs(input);
        return this.http.post(`/flow/${ flowId }`, input);
        // TODO: Parse JSON output
    }

    public transformFormInputsToDEExecutionInputs(input) {
        let inputFields = Object.keys(input.value);
        let ioWrapper = [];
        let executionInput = {rootGroup: {IoGroupInstances: ioWrapper}};
        for (let field of inputFields) {
            let ft = <IoFactType>{};
            ft.factTypeName = field;
            ft.values = [input.value[field]];
            ft.isConclusionValues = false;
            ioWrapper.push({IoFactTypes:[ft]});
        }
        return executionInput;
    }

    public transformDEExecutionResultsToFormInputs(executionResults){
        for(let result of executionResults){

        }
    }
}
