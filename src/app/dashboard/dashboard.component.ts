import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ef-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
    views: { title: string; description: string, link: string }[];

    ngOnInit() {
        this.views = [
            {
                title: 'Configuration',
                description: 'Provide configuration for processes, flows and layouts.',
                link: 'config'
            },
            {
                title: 'Preview',
                description: 'Select a flow to preview its form.',
                link: 'preview'
            },
            {
                title: 'Run Process',
                description: 'Select a process and start running it.',
                link: 'process'
            }
        ];
    }
}
