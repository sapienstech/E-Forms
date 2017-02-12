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

export interface AppState {
    processes: ProcessConfig[];
}

export interface ProcessState {
    currentStep: number;
    config: ProcessConfig;

}

export interface Step {
    manifest: any;
}
