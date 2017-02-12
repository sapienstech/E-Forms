
export class FactType{
  name : string;
  modelMapping:string;
  dataType:string;
  isPersistent :boolean;
  "isConclusion": boolean;
  "isList": boolean;
  "factTypeDefinition": number;
  validValues:any;
}

export class Group{
  groups:Group[];
  factType :FactType[];
}

export class Asset{
  group:Group;
  assetType:string;
  asset:Asset[];
  name:string;
}

export class Manifest{
  asset:Asset[];
}

export class FieldSet{

  fields:string[];
  title:string;
}

export class FormElement{

  type:string;
  widget:string;
  description:string;
  format:string;
  visibleIf:any;
  oneOf:any[];
  required:string[];
  fieldsets : FieldSet[];
  items: FormElement;
  properties:FormElement; // this field can have fields from its own type, I don't know how to decalre it.
}

export class FormSchema extends FormElement{

}
