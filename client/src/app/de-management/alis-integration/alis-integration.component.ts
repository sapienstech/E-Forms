import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, /*Router*/} from "@angular/router";
import {ManagementServiceFacade} from "../services/management.service.facade";

@Component({
    template: ``,
    selector: 'alis-integration'
})
export class AlisIntegrationComponent implements OnInit{

    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade/*, private router: Router*/) {
    }

    ngOnInit(): void {
        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.route.queryParams.subscribe((params: Params) => {
                      params[0];
            });
        });
    }

}
