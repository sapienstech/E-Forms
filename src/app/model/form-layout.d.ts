import { Fieldset } from './form-schema';

export class FormLayout {
    fieldsets: Fieldset[];
    collapsible: boolean;
    required: string[];
    dependencies: Dependency[];
}

export class Dependency {
    fields: string[];
    dependentOn: string;
    value: any;
}

