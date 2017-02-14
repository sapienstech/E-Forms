import {Component} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {TransformationService} from '../../services/transformation.service';
import {PARSE_ERROR} from '../../types/constants';
import { FormSchema } from '../../types/types';

@Component({
  selector: 'ef-form-preview',
  templateUrl: 'preview.component.html',
  styleUrls: ['preview.component.less']
})
export class PreviewComponent {
  schema: FormSchema ;
  model:any = {};
  error:string;
  layout:any;

  constructor(private utilsService:UtilsService,
              private manifestTransformerService:TransformationService) {
  }

  layoutFileSelected(data:any){
    this.utilsService.parseFileToObject(data.currentTarget.files[0]).subscribe(result => {
      this.layout = result;
    });

  }


 manifestFileSelected(data:any) {
    //necessary for CD
    this.schema = null;
    this.utilsService.parseFileToObject(data.currentTarget.files[0]).subscribe(result => {
      try {
        this.error = '';
        let formSchema = this.manifestTransformerService.transformToFormSchema(result);
        this.schema = formSchema;
      }
      catch (er) {
        this.error = PARSE_ERROR;
      }

    },error=>{
      this.error = error;
    });
  }

}
