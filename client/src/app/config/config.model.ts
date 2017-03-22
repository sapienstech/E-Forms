import { ArtifactKey } from '../model/execution';
export interface ProcessConfig {
    id: string;
    title: string;
    description?: string;
    steps: StepConfig[];
}

export type StepType = 'ui' | 'execute' | 'async';

export interface StepConfig {
    flow: ArtifactKey;
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
