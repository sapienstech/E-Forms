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

export class Fieldset {
    fields: string[];
    title: string;
}
