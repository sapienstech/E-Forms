import {Component, ContentChild, forwardRef, Query} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {ManifestTransformerService} from '../../services/manifest-transformer.service';
import {PARSE_ERROR} from '../../types/constants';
import {EformComponent} from '../eform/eform.component';

@Component({
  selector: 'ef-form-preview',
  templateUrl: 'preview.component.html',
  styleUrls: ['preview.component.less']
})
export class PreviewComponent {
  schema: any ;
  model:any = {};
  error:string;

  @ContentChild('eform')
  eform:EformComponent;

  constructor(private utilsService:UtilsService,private manifestTransformerService:ManifestTransformerService){

  }


  schemaFileSelected(data){
    this.parseSelectedFileToForm(data,false);
  }

  manifestFileSelected(data){
    this.parseSelectedFileToForm(data);
  }

  parseSelectedFileToForm(data:any,isManifestFile:boolean = true) {
    //necessary for CD
    this.schema = null;
    this.utilsService.parseFileToObject(data.currentTarget.files[0]).subscribe(result => {
      try {
        this.error = '';
        let formSchema:any = result;
        if(isManifestFile){
          formSchema = this.manifestTransformerService.transformToFormSchema(result);
        }
        this.schema = formSchema;
      }
      catch (er) {
        this.error = PARSE_ERROR;
      }

    },error=>{
      this.error = error;
    });
  }


  execute(){
    this.eform;
  }
}
