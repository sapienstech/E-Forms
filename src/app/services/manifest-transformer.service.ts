import { Injectable } from '@angular/core';
import {Asset, FactType, FormElement, FormSchema, Manifest} from '../types/types';



@Injectable()
export class ManifestTransformerService {

public transformToFormSchema(manifest:Manifest):FormSchema{
  let form :FormSchema = new FormSchema();
  let formProperties = new FormElement();
  //support main flow only
  let mainAsset :Asset = manifest.asset[0];
  if (mainAsset.assetType === 'FLOW'){
    let factTypes = mainAsset.group.factType;
    for(let factType of factTypes){
      if(factType.isPersistent === false) continue;
      formProperties [factType.modelMapping] = new FormElement();
      if(factType.isList === true){
        formProperties [factType.modelMapping].type = 'array';
        formProperties [factType.modelMapping].items = new FormElement();
        formProperties [factType.modelMapping].items.type = this.convertDataTypeToElementType(factType.dataType);
        formProperties [factType.modelMapping].items.description = factType.name;

      }
      else {
        formProperties [factType.modelMapping] = new FormElement();
        formProperties [factType.modelMapping].description = factType.name;
        formProperties [factType.modelMapping].type = this.convertDataTypeToElementType(factType.dataType);
      }
      if(factType.validValues){
        formProperties [factType.modelMapping].oneOf = [];
        for (let index in factType.validValues){
          formProperties [factType.modelMapping].oneOf.push({enum:['x'+ index],description:factType.validValues[index]});
        }
      }
    }
    form.properties = formProperties;
    form.fieldsets = [];
    form.required = [];
    form.fieldsets.push({title:mainAsset.name,fields:Object.keys(formProperties)});
    form.type = 'object';
    return form;
  }
else throw Error('This is not valid Decision Flow manifest file');


}

  private convertDataTypeToElementType(dataType: string) {

    switch(dataType){
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
