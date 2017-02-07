import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'form',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.less']
})
export class EditorComponent {
  schema: any ;

  fileSelected(data){
    let file : any= data.currentTarget.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', (result) => {
        this.schema = this.parseJsonFile(result);
      });
      //necessary for CD
      this.schema = null;
      reader.readAsText(file);
  }

  private parseJsonFile(result) {
    var target: any = result.target.result;
    return JSON.parse(target);
  }


}
