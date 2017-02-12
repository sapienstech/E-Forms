import { Injectable } from '@angular/core';

export interface ProcessInfo {
    title: string;
    description?: string;
}

@Injectable()
export class ControllerService {
    getProcesses() {
        const response: ProcessInfo[] = [
            { title: 'Process 1' },
            { title: 'Process 2', description: 'Process 2 Description' }
        ];
        return response;
    }
}
