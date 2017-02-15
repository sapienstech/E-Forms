export interface ExecutionInput {
    executableKey: {
        artifactKey: ArtifactKey;
    };
    executionInput: {
        rootGroup: {
            IoGroupInstances: { IsFactTypes: IoFactType[] }[];
        };
    };
    executionConfiguration: undefined;
}

export interface ExecutionResult {
    executionResults: {
        conclusion: IoFactType;
    }[];
}

export interface ArtifactKey {
    name: string;
    releaseName: string;
    tagName: string;
    artifactType: 'FLOW';
}

export interface IoFactType {
    factTypeName: string;
    values: string[];
    isConclusionValues: boolean;
    rowHits?;
}
