import { Injectable } from '@angular/core';

import {
    Asset,
    Dependency,
    FactType,
    FormElement,
    FormLayout,
    FormSchema,
    Manifest
} from '../types/types';

@Injectable()
export class TransformationService {

    public mergeLayoutWithSchema(metadata: FormSchema, layout: FormLayout): FormSchema {
        if (!layout) {
            return metadata;
        }

        metadata.required = layout.required;

        if (layout.collapsible) {
            metadata.widget = 'collapsible';
        }

        this.buildElementDependencies(layout.dependencies, metadata);
        metadata.fieldsets = layout.fieldsets;
        this.moveAllUnSectionedFiledsToLastSection(layout, metadata);

        return metadata;
    }

    public transformToFormSchema(manifest: Manifest): FormSchema {
        let formProperties = new FormElement();
        // support main flow only
        let mainAsset: Asset = manifest.asset[0];
        if (mainAsset.assetType === 'FLOW') {
            let factTypes = mainAsset.group.factType;
            for (let factType of factTypes) {
                if (factType.isPersistent === false) {
                    continue;
                }

                formProperties[factType.modelMapping] = this.createNewFormElement(factType);
                if (factType.isList) {
                    formProperties[factType.modelMapping].type = 'array';
                    formProperties[factType.modelMapping].items = this.createElementListItems(factType);
                }
                if (factType.validValues) {
                    formProperties[factType.modelMapping].widget = 'select';
                    formProperties[factType.modelMapping].oneOf = this.createElementsValidValues(factType);
                }
            }
            let form = this.createFormSchema(formProperties, mainAsset.name);
            return form;
        } else {
            throw Error('This is not valid Decision Flow manifest file');
        }
    }

    private createFormSchema(formProperties: FormElement, formName: string): FormSchema {
        let form: FormSchema = new FormSchema();
        form.properties = formProperties;
        form.fieldsets = [];
        form.required = [];
        form.fieldsets.push({ title: formName, fields: Object.keys(formProperties) });
        form.type = 'object';
        return form;
    }

    private createElementsValidValues(factType: FactType): Array<any> {
        return factType.validValues.value
            .map((value, index) => {
                return {
                    enum: ['L' + index],
                    description: value
                };
            });
    }

    private createElementListItems(factType: FactType): FormElement {
        let items = new FormElement();
        items.type = this.convertDataTypeToElementType(factType.dataType);
        items.description = factType.name;
        return items;
    }

    private createNewFormElement(factType: FactType): FormElement {
        let formElement = new FormElement();
        formElement.description = factType.name;
        let type = this.convertDataTypeToElementType(factType.dataType);
        if (type === 'date') {
            formElement.type = 'string';
            formElement.format = 'date';
            formElement.widget = 'date';
        } else {
            formElement.type = type;
        }
        return formElement;
    }

    private convertDataTypeToElementType(dataType: string) {
        switch (dataType) {
            case 'TEXT':
            case 'CODE':
            case 'IDENTIFIER':
            case 'NAME':
            case 'TEXT':
            case 'ENUMERATOR':
                return 'string';

            case 'AMOUNT':
            case 'NUMERIC':
            case 'PERCENT':
            case 'BASIS_POINTS':
            case 'QUANTITY':
            case 'DAY':
            case 'MONTH':
            case 'YEAR':
            case 'MONTH_YEAR':
                return 'number';

            case 'INDICATOR':
                return 'boolean';

            case 'DATE':
            case 'DATE_TIME':
                return 'date';
        }
        return 'string';

    }

    private moveAllUnSectionedFiledsToLastSection(layout: FormLayout, metadata: FormSchema) {
        let fields: string[] = layout.fieldsets.map(s => s.fields).reduce((a, b) => {
            return a.concat(b)
        });
        let missingSectionedFields = [];
        Object.keys(metadata.properties).forEach(prop => {
            if (fields.indexOf(prop) < 0) {
                missingSectionedFields.push(prop);
            }
        });
        metadata.fieldsets.push({ title: 'Others', fields: missingSectionedFields });
    }

    private buildElementDependencies(dependencies: Dependency[], metadata: FormElement) {
        dependencies.forEach((dp: Dependency) => {
            dp.fields.forEach(field => {
                if (metadata.properties[field]) {
                    metadata.properties[field].visibleIf = {};
                    metadata.properties[field].visibleIf[dp.dependentOn] = [dp.value];
                }
            });
        });
    }
}
