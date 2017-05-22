export interface ArtifactInfo {
    tagName: string;
    name: string;
    artifactType: string;
    releaseName: string;
    unNormalizedReleaseName: string;
    unNormalizedTagName: string;
    unNormalizedName: string;

}
//
// export interface FactType {
//     name: string;
//     modelMapping: string;
//     dataType: string;
//     isPersistent: boolean;
//     'isConclusion': boolean;
//     'isList': boolean;
//     'factTypeDefinition': number;
//     validValues: any;
// }
//
// export interface Group {
//     groups: Group[];
//     factType: FactType[];
// }
//
// export interface Asset {
//     group: Group;
//     assetType: string;
//     asset: Asset[];
//     name: string;
// }
//
// export interface Manifest {
//     asset: Asset[];
// }
//
// export class FormLayout {
//     fieldsets: FieldSet[];
//     collapsible: boolean;
//     required: string[];
//     dependencies: Dependency[];
// }
//
// export class Dependency {
//     fields: string[];
//     dependentOn: string;
//     value: any;
// }
//
// export class FieldSet {
//
//     fields: string[];
//     title: string;
// }
//
// export class FormElement {
//
//     type: string;
//     widget: string;
//     description: string;
//     format: string;
//     visibleIf: any;
//     oneOf: any[];
//     required: string[];
//     fieldsets: FieldSet[];
//     items: FormElement;
//     properties: FormElement; // this field can have fields from its own type, I don't know how to decalre it.
// }
//
// export class FormSchema extends FormElement {
//
// }
