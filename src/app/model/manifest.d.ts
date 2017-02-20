export interface Manifest {
    asset: Asset[];
    release: string;
    tag: string;
}

export interface Asset {
    name: string;
    assetType: 'FLOW' | 'DECISION';
    group: {
        factType: FactType[];
    }
}

export type DataType = 'TEXT' | 'CODE' | 'IDENTIFIER' | 'NAME' | 'TEXT' | 'ENUMERATOR'
    | 'AMOUNT' | 'NUMERIC' | 'PERCENT' | 'BASIS_POINTS' | 'QUANTITY' | 'DAY' | 'MONTH' | 'YEAR' | 'MONTH_YEAR'
    | 'INDICATOR'
    | 'DATE' | 'DATE_TIME';

export interface FactType {
    modelMapping: string;
    name: string;
    dataType: DataType;
    isPersistent: boolean;
    isList: boolean;
    validValues: {
        value: string[];
    };
}
