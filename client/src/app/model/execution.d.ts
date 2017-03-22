export interface ExecutionInput {
    executableKey: {
        artifactKey: ArtifactKey;
        effectiveDate:string
    };
    executionInput: {
        root: {
            [factTypeName: string]: string;
        };
    };
    executionConfiguration: undefined;
}

export interface ArtifactKey {
    name: string;
    releaseName: string;
    tagName: string;
    artifactType: 'FLOW';
}

export interface ExecutionResult {
    trace: {
        root: {
            factTypeDetails: any;

            [factTypeName: string]: string;
        }
    }
}

export interface FactTypeDetails {
    [conclusion: string]: {
        rowHits?: {
            messages: Messages;
        }[];
    };
}

export interface Messages {
    [category: string]: string;
}
