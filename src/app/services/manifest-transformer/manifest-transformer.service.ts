import { Injectable } from '@angular/core';
import { Asset, FactType, FormElement, FormSchema, Manifest } from '../../types/types';


@Injectable()
export class ManifestTransformerService {

  public transformToFormSchema(manifest: Manifest): FormSchema {
    let formProperties = new FormElement();
    //support main flow only
    let mainAsset: Asset = manifest.asset[0];
    if (mainAsset.assetType === 'FLOW') {
      let factTypes = mainAsset.group.factType;
      for (let factType of factTypes) {
        if (factType.isPersistent === false) continue;
        formProperties [factType.modelMapping] = this.createNewFormElement(factType);
        if (factType.isList) {
          formProperties [factType.modelMapping].type = 'array';
          formProperties [factType.modelMapping].items = this.createElementListItems(factType);
        }
        if (factType.validValues) {
          formProperties [factType.modelMapping].widget = 'select';
          formProperties [factType.modelMapping].oneOf = this.createElementsValidValues(factType);
        }
      }
      let form = this.createFormSchema(formProperties, mainAsset.name);
      return form;
    }
    else throw Error('This is not valid Decision Flow manifest file');
  }

  private createFormSchema(formProperties: FormElement, formName: string): FormSchema {
    let form: FormSchema = new FormSchema();
    form.properties = formProperties;
    form.fieldsets = [];
    form.required = [];
    form.fieldsets.push({title: formName, fields: Object.keys(formProperties)});
    form.type = 'object';
    return form;
  }

  private createElementsValidValues(factType: FactType) : Array<any>{
    let oneOfArray = [];
    for (let index in factType.validValues.value) {
      oneOfArray.push({enum: ['L' + index], description: factType.validValues.value[index]});
    }
    return oneOfArray;
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
    if (type == 'date') {
      formElement.type = 'string';
      formElement.format = 'date';
      formElement.widget = 'date';
    }
    else {
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

}
