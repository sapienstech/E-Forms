import { Component } from '@angular/core';

@Component({
  selector: 'form',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.less']
})
export class EditorComponent {
  schema: any ;

  constructor() {

  }


  fileSelected(data){
    let file : any= data.currentTarget.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', (result) => {
        var target:any = result.target;
        var decodedString = String.fromCharCode.apply(null, new Uint8Array(target.result));
        this.schema = JSON.parse(decodedString);
      });
      reader.readAsArrayBuffer(file);


  }


}
