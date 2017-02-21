import { Injectable } from '@angular/core';

import {
    JsonSchemaType,

    FormProperty,
    FormSchema,

    FormLayout,
    Dependency,

    Manifest,
    FactType
} from '../model';

@Injectable()
export class TransformationService {
    mergeLayoutWithSchema(metadata: FormSchema, layout: FormLayout): FormSchema {
        if (!layout) {
            return metadata;
        }
        this.buildHiddenFields(metadata, layout);
        metadata.required = layout.required;
        if (layout.collapsible) {
            metadata.widget = 'collapsible';
        }
        this.buildElementDependencies(layout.dependencies, metadata);
        metadata.fieldsets = layout.fieldsets;
        this.moveAllUnSectionedFiledsToLastSection(layout, metadata);

        return metadata;
    }

    private buildHiddenFields(metadata: FormSchema, layout: FormLayout) {
        if(!layout.hidden){
            return;
        }
        Object.keys(metadata.properties).forEach(prop => {
            if (layout.hidden.indexOf(prop) >= 0) {
                metadata.properties[prop].widget = 'hidden';
            }
        });
    }

    transformToFormSchema(manifest: Manifest): FormSchema {
        let flow = manifest.asset[0];
        if (!flow || flow.assetType !== 'FLOW') {
            throw new Error('Invalid manifest');
        }

        let form: FormSchema = {
            type: 'object',
            properties: {},
            required: [],
            fieldsets: [{
                title: flow.name,
                fields: []
            }]
        };

        flow.group.factType
            .filter(ft => ft.isPersistent !== false)
            .forEach(ft => {
                let property = this.convertProperty(ft);

                if (ft.isList) {
                    property.type = 'array';
                    property.items = this.convertProperty(ft);
                }

                form.properties[ft.modelMapping] = property;
                form.fieldsets[0].fields.push(ft.modelMapping);
            });

        return form;
    }

    private convertProperty(factType: FactType) {
        let property: FormProperty = {
            description: factType.name,
            type: this.convertDataType(factType.dataType)
        };

        if (factType.dataType === 'DATE' || factType.dataType === 'DATE_TIME') {
            property.format = 'date';
            property.widget = 'date';
        }

        if (factType.validValues) {
            property.widget = 'select';
            property.oneOf = this.convertValidValues(factType);
        }

        return property;
    }

    private convertValidValues(factType: FactType): Array<any> {
        return factType.validValues.value
            .map((value, _index) => {
                return {
                    enum: [value], //['L' + index],
                    description: value
                };
            });
    }

    private convertDataType(dataType: string): JsonSchemaType {
        switch (dataType) {
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
            case 'TEXT':
            case 'CODE':
            case 'IDENTIFIER':
            case 'NAME':
            case 'TEXT':
            case 'ENUMERATOR':
                return 'string';
        }

        return 'string';
    }

    private moveAllUnSectionedFiledsToLastSection(layout: FormLayout, metadata: FormSchema) {
        if(!layout.fieldsets) {
            return;
        }
        let fields: string[] = layout.fieldsets.map(s => s.fields).reduce((a, b) => {
            return a.concat(b);
        });
        let missingSectionedFields = [];
        Object.keys(metadata.properties).forEach(prop => {
            if (fields.indexOf(prop) < 0) {
                missingSectionedFields.push(prop);
            }
        });
        metadata.fieldsets.push({ title: 'Others', fields: missingSectionedFields });
    }

    private buildElementDependencies(dependencies: Dependency[], metadata: FormProperty) {
        if(!dependencies) {
            return;
        }
        dependencies.forEach((dp: Dependency) => {
            dp.fields.forEach(field => {
                if (metadata.properties[field]) {
                    metadata.properties[field].visibleIf = {
                        [dp.dependentOn]: [dp.value]
                    };
                }
            });
        });
    }
}
