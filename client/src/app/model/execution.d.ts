export interface ExecutionInput {
    executableKey: {
        artifactKey: ArtifactKey;
        effectiveDate:string;
    };
    executionInput: {
        root: {
            [factTypeName: string]: string;
        };
    };
    executionConfiguration: undefined;
}

export interface DiExecutionInput {
    executableKey: {
        artifactKey: ArtifactKey;
        effectiveDate:string;
    };
    instanceId: string;
    executionConfiguration: object;
}

export interface ArtifactKey {
    name: string;
    releaseName: string;
    tagName: string;
    artifactType: 'FLOW';
}

export interface ExecutionResult {
    conclusion:any;
    requiredFactTypes:any[];
    error:any;
    trace: {
        root?: {
            factTypeDetails: any;

            [factTypeName: string]: string;
        },
        Root?: {
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
