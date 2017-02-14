import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { TransformationService } from '../services/transformation.service';
import { PARSE_ERROR } from '../../types/constants';
import { FormSchema } from '../../types/types';

@Component({
    selector: 'ef-form-preview',
    templateUrl: 'preview.component.html',
    styleUrls: ['preview.component.less']
})
export class PreviewComponent {
    schema: FormSchema;
    model: any = {};
    error: string;
    layout: any;

    constructor(private utilsService: UtilsService,
                private manifestTransformerService: TransformationService) {
    }

    layoutFileSelected(data: any) {
        this.utilsService.parseFileToObject(data).subscribe(result => {
            this.layout = result;
        });
    }

    manifestFileSelected(data: any) {
        this.utilsService.parseFileToObject(data).subscribe(result => {
            try {
                this.error = '';
                let formSchema = this.manifestTransformerService.transformToFormSchema(result);
                this.schema = formSchema;
            }
            catch (er) {
                this.error = PARSE_ERROR;
            }

        }, error => {
            this.error = error;
        });
    }

    filesSelected(data: any) {
        //necessary for CD
        this.schema = null;
        if(data.currentTarget.files.length == 1){
            //if the user selected only one file, it has to be form metadata
            this.layout = null;
        }

        for (let file of data.currentTarget.files) {
            if (file.name.search('layout') > -1) {
                this.layoutFileSelected(file);
            }
            else {
                this.manifestFileSelected(file);
            }
        }
    }

}
