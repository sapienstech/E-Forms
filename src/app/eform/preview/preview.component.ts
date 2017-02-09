import {Component} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {ManifestTransformerService} from '../../services/manifest-transformer';

@Component({
  selector: 'ef-form-preview',
  templateUrl: 'preview.component.html',
  styleUrls: ['preview.component.less']
})
export class PreviewComponent {
  schema: any ;

  constructor(private utilsService:UtilsService,private manifestTransformerService:ManifestTransformerService){

  }

  fileSelected(data){
    //necessary for CD
    this.schema = null;
    this.utilsService.parseFileToObject(data.currentTarget.files[0]).subscribe((result=>{
      let x = this.manifestTransformerService.transformToFormSchema(result);
      this.schema = result;
    }));


  }


}
