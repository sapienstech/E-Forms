import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IoFactType } from '../model/execution';

@Injectable()
export class FlowExecutorService {
    constructor(private http: Http) {
    }

    execute(flowId: string, input) {
        let executionInputs = this.transformFormInputsToDEExecutionInputs(input);
        return this.http.post(`/flow/${ flowId }`, executionInputs).map(r=>this.transformDEExecutionResultsToFormInputs(r));
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

    public transformDEExecutionResultsToFormInputs(flowResults){
        let results = {};
        for(let result of flowResults.executionResults){
                if(result.conclusion.values)
                    results[result.conclusion.factTypeName] = result.conclusion.values.join(',');
        }
        return results;
    }
}
