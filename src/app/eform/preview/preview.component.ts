import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { ManifestTransformerService } from '../../services/manifest-transformer.service';
import { PARSE_ERROR } from '../../types/constants';

@Component({
    selector: 'ef-form-preview',
    templateUrl: 'preview.component.html',
    styleUrls: ['preview.component.less']
})
export class PreviewComponent {
    schema: any;
    model: any = {};
    error: string;

    constructor(private utilsService: UtilsService,
        private manifestTransformerService: ManifestTransformerService) {

    }

    manifestFileSelected(data) {
        this.parseSelectedFileToForm(data);
    }

    parseSelectedFileToForm(data: any) {
        // necessary for CD
        this.schema = null;
        this.utilsService.parseFileToObject(data.currentTarget.files[0]).subscribe(result => {
            try {
                this.error = '';
                let formSchema = this.manifestTransformerService.transformToFormSchema(result);
                this.schema = formSchema;
            } catch (er) {
                this.error = PARSE_ERROR;
            }

        }, error => {
            this.error = error;
        });
    }

}
