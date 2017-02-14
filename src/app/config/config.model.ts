export interface ProcessConfig {
    title: string;
    description?: string;
    steps: StepConfig[];
}

export interface StepConfig {
    flow: string;
    type?: 'ui' | 'execute' | 'async';
    validation?: boolean;
}
