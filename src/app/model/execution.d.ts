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
    values?: string[];
    isConclusionValues: boolean;
    rowHit?: {
        message: Message[];
    }[];
}

export interface Message {
    category: string;
    text: string;
}
