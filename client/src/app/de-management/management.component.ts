import { Component, OnInit } from '@angular/core';
import { ArtifactInfo } from '../types/types';
import { ManagementServiceFacade } from './services/management.service.facade';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

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

    constructor(private utilsService: UtilsService,private service: ManagementServiceFacade, private router: Router) {
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
                        de.hostName = this.utilsService.extractHostname(de.url);
                        this.service.getDEHealthCheck(de).subscribe(r => {
                            if (r.error) {
                                de.aliveStatus = 'Server is down';
                            } else {
                                //de.aliveStatus = 'Ver: ' + r.status;
                            }
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
            this.projects = _.groupBy(this.artifacts, 'originalReleaseName');

            this.projects = Object.keys(this.projects).map(f => {
                return {
                    name: f,
                    selected: false,
                    tags: this.projects[f]
                };
            });

            this.projects.forEach(p => {
                p.tags = _.groupBy(p.tags, 'originalTagName');
                p.tags = Object.keys(p.tags).map(t => {
                    return {
                        name: t,
                        selected: false,
                        flows: p.tags[t]
                    }
                });
                p.tags.sort(this.sortByName);
            });

            this.projects.sort(this.sortByName);

        });
    }

    private sortByName(objA : any ,objB : any) : any{
        var nameA = objA.name.toUpperCase();
        var nameB = objB.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    public projectSelected(flow: any) {
        Object.keys(this.projects).forEach((f:any) => {
            if(this.projects[f].name == flow.name) return;
            this.projects[f].selected = false;
        });
        flow.selected = !flow.selected

    }

    public projectDetailsClicked(event : any){
        event.stopPropagation();
    }

    flowClicked(flow: any) {

        let url = '/questionnaire?flow-name=' + flow.name +
            '&flow-real-name=' + flow.originalName+
            '&tag-name=' + flow.tagName +
            '&version=' + flow.version +
            '&release-name=' + flow.releaseName;

        if (this.selectedDE) {
            url = url +
                '&de-name=' + this.selectedDE.name +
                '&de-url=' + this.selectedDE.url;
        }

        this.router.navigateByUrl(url);

    }
}
