export interface ExecutionInput {
    executableKey: {
        artifactKey: ArtifactKey;
    };
    executionInput: {
        rootGroup: {
            IoGroupInstances: { IoFactTypes: IoFactType[] }[];
        };
    };
    executionConfiguration: undefined;
}

export interface ExecutionResults {
    executionResults: ExecutionResult[];
}

export interface ExecutionResult {
    conclusion: IoFactType;
}

export interface ArtifactKey {
    name: string;
    releaseName: string;
    tagName: string;
    artifactType: 'FLOW';
}

export interface IoFactType {
    factTypeName: string;
    values?: string[];
    isConclusionValues: boolean;
    rowHits?;
}
