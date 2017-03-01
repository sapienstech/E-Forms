import { Component } from '@angular/core';

import { UtilsService } from '../../services/utils.service';
import { TransformationService } from '../../config';

import { PARSE_ERROR } from '../../types/constants';
import { FormSchema } from '../../model';
import { Http } from '@angular/http';

@Component({
    selector: 'ef-form-preview',
    templateUrl: 'preview.component.html',
    styleUrls: ['preview.component.less']
})
export class PreviewComponent {

    model: any = {};
    error: string;

    schema: FormSchema;
    layout: any;
    metadata: any;

    constructor(private utilsService: UtilsService,
                private transformerService: TransformationService,
                private http:Http) {

        this.http.get('client/src/data/example/preview1.manifest.json').subscribe(manifest=>{
            this.metadata = this.transformerService.transformToFormSchema(manifest.json());
            this.http.get('client/src/data/example/preview1.layout.json').subscribe(layout=>{
                this.layout = layout.json();
                this.generateForm();
            });
        });

    }

    generateForm() {
        this.schema = this.transformerService.mergeLayoutWithSchema(this.metadata, this.layout);
    }

    layoutFileSelected(data: any) {
        let file = data.currentTarget.files[0];
        if (!file) {
            return;
        }

        this.utilsService.parseFileToObject(file).subscribe(result => {
            this.layout = result;
        });
    }

    manifestFileSelected(data: any) {
        this.schema = null;
        this.layout = null;
        let file = data.currentTarget.files[0];
        if (!file) {
            return;
        }

        this.utilsService.parseFileToObject(file).subscribe(result => {
            try {
                this.error = '';
                let formSchema = this.transformerService.transformToFormSchema(result);
                this.metadata = formSchema;
            } catch (er) {
                this.error = PARSE_ERROR;
            }

        }, error => {
            this.error = error;
        });
    }
    dataChanged(data) {
        data.toString();
    }
}
