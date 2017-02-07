import {Component} from '@angular/core';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'ef-form-preview',
  templateUrl: 'preview.component.html',
  styleUrls: ['preview.component.less']
})
export class PreviewComponent {
  schema: any ;

  constructor(private utilsService:UtilsService){

  }

  fileSelected(data){
    //necessary for CD
    this.schema = null;
    this.utilsService.parseFileToObject(data.currentTarget.files[0]).subscribe((result=>{
      this.schema = result;
    }));


  }


}
