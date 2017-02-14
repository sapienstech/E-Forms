import { ProcessConfig } from './config.model';

export class ConfigService {
    getProcessConfig(): ProcessConfig[] {
        return [
            { title: 'Process 1', steps: [] },
            {
                title: 'Process 2',
                description: 'Process 2 Description',
                steps: [
                    {
                        flow: 'flow1'
                    }
                ]
            }
        ];
    }
}
