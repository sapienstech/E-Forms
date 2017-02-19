import { JsonSchema } from './json-schema';

export interface FormProperty extends JsonSchema {
    widget?: string;
    visibleIf: {
        [prop: string]: any;
    }
}

export interface FormSchema extends FormProperty {
    fieldsets?: string[];
}
