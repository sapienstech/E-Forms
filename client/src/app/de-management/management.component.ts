import { Component, OnInit } from '@angular/core';
import { ArtifactInfo } from '../types/types';
import { ManagementServiceFacade } from './services/management.service.facade';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
    selector: 'management',
    styleUrls: ['./management.component.less'],
    templateUrl: './management.component.html'
})
export class ManagementComponent implements OnInit {
    private deServers: any[];
    private artifacts: any[];
    private isLocal: boolean;
    private projects: any;
    private selectedDE: any;

    constructor(private service: ManagementServiceFacade, private router: Router) {
    }

    ngOnInit() {

        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.isLocal = r;

            if (this.isLocal) {
                this.getArtifacts(null);
            }
            else {
                this.service.getDEsInfo().subscribe(list => {
                    this.deServers = list;
                    this.deServers.forEach(de => {
                        this.service.getDEHealthCheck(de).subscribe(r => {
                            de.aliveStatus = r;
                        })
                    });
                });
            }
        });
    }

    public DEClicked(de: any) {
        this.deServers.forEach(e => e.selected = null);
        de.selected = true;
        this.selectedDE = de;
        this.getArtifacts(de);
    }

    expandTag(tag: any) {
        tag.selected = !tag.selected;
    }

    private getArtifacts(de: any) {
        this.service.getArtifacts(de).subscribe((result: ArtifactInfo[]) => {
            this.artifacts = result.filter((r: any) => r.artifactType == 'FLOW'); //TODO: need to move the filter to the service
            this.projects = _.groupBy(this.artifacts, 'releaseName');
            this.projects = Object.keys(this.projects).map(f => {
                return {
                    name: f,
                    selected: false,
                    tags: this.projects[f]
                };
            });

            this.projects.forEach(p => {
                p.tags = _.groupBy(p.tags, 'tagName');
                p.tags = Object.keys(p.tags).map(t => {
                    return {
                        name: t,
                        selected: false,
                        flows: p.tags[t]
                    }
                })
            });


        });
    }

    public flowSelected(flow: any) {
        Object.keys(this.projects).forEach(f => {
            this.projects[f].selected = false;
        });
        flow.selected = true

    }

    flowClicked(flow: any) {
        this.router.navigateByUrl('/execute-flow?flow-name=' + flow.name +
            '&tag-name=' + flow.tagName +
            '&release-name=' + flow.releaseName +
            '&de-name=' + this.selectedDE.name +
            '&de-url=' + this.selectedDE.url);

    }
}
