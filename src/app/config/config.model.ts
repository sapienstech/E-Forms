export interface ProcessConfig {
    title: string;
    description?: string;
    steps: StepConfig[];
}

export type StepType = 'ui' | 'execute' | 'async';

export interface StepConfig {
    flow: string;
    type?: StepType;
    title?: string;
    validation?: boolean;
}
