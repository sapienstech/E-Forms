import { JsonSchema } from './json-schema';

export interface FormProperty extends JsonSchema {
    properties?: {
        [name: string]: FormProperty;
    };
    items?: FormProperty | FormProperty[];
    index?:string;
    format?: string; // TODO: Check if this is standard JSON Schema
    widget?: string;
    visibleIf?: {
        [prop: string]: any;
    };
    buttons?: Button[];
}

export interface Button {
    id: string;
    label: string;
}

export interface Fieldset {
    title: string;
    fields: string[];
}

export interface FormSchema extends FormProperty {
    fieldsets?: Fieldset[];
}
