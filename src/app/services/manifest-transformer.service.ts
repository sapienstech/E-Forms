import {Injectable} from '@angular/core';
import {Asset, FormElement, FormSchema, Manifest} from '../types/types';


@Injectable()
export class ManifestTransformerService {

  public transformToFormSchema(manifest: Manifest): FormSchema {
    let form: FormSchema = new FormSchema();
    let formProperties = new FormElement();
    //support main flow only
    let mainAsset: Asset = manifest.asset[0];
    if (mainAsset.assetType === 'FLOW') {
      let factTypes = mainAsset.group.factType;
      for (let factType of factTypes) {
        if (factType.isPersistent === false) continue;
        formProperties [factType.modelMapping] = new FormElement();
        let type = this.convertDataTypeToElementType(factType.dataType);
        if(type == 'date'){
          formProperties [factType.modelMapping].type = 'string';
          formProperties [factType.modelMapping].format = 'date';
        }
        else{
          formProperties [factType.modelMapping].type = type;
        }
        formProperties [factType.modelMapping].description = factType.name;

        if (factType.isList === true) {
          formProperties [factType.modelMapping].type = 'array';
          formProperties [factType.modelMapping].items = new FormElement();
          formProperties [factType.modelMapping].items.type = this.convertDataTypeToElementType(factType.dataType);
          formProperties [factType.modelMapping].items.description = factType.name;

        }
        if (factType.validValues) {
          formProperties [factType.modelMapping].widget = 'select';
          formProperties [factType.modelMapping].oneOf = [];
          for (let index in factType.validValues.value) {
            formProperties [factType.modelMapping].oneOf.push({enum: ['L' + index], description: factType.validValues.value[index]});
          }
        }
      }
      form.properties = formProperties;
      form.fieldsets = [];
      form.required = [];
      form.fieldsets.push({title: mainAsset.name, fields: Object.keys(formProperties)});
      form.type = 'object';
      return form;
    }
    else throw Error('This is not valid Decision Flow manifest file');


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

}
