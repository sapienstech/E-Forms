export interface ProcessConfig {
    id: string;
    title: string;
    description?: string;
    steps: StepConfig[];
}

export type StepType = 'ui' | 'execute' | 'async';

export interface StepConfig {
    flow: string;
    type?: StepType;
    title?: string;
    validation?: ValidationConfig;
}

export interface ValidationValidConfig {
    conclusion: string;
    valid: string;
}

export interface ValidationInvalidConfig {
    conclusion: string;
    invalid: string;
}

export type ValidationConfig = ValidationValidConfig | ValidationInvalidConfig;
