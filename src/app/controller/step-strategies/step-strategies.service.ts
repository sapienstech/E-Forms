import { Injectable, Inject } from '@angular/core';

import { StepType } from '../../config';

import { StepStrategy } from './step-strategy';

@Injectable()
export class StepStrategiesService {
    private strategies: Map<StepType, StepStrategy>;

    constructor(
        @Inject(StepStrategy)
        strategies: StepStrategy[]
    ) {
        this.prepareStrategies(strategies);
    }

    getStrategy(type: StepType) {
        return this.strategies.get(type || 'ui');
    }

    private prepareStrategies(strategies: StepStrategy[]) {
        this.strategies = new Map<StepType, StepStrategy>();
        strategies.forEach(s => this.strategies.set(s.type, s));
    }
}
