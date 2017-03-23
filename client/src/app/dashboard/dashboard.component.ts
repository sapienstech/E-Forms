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
                description: 'Provide configuration for available DEs.',
                link: 'config'
            },
            {
                title: 'Management Console',
                description: 'Execute Decision flows',
                link: 'demc'
            }
        ];
    }
}
