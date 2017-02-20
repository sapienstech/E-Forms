import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

import { ControllerState } from './controller-state';

@Injectable()
export class ProcessRouteGuard implements CanActivate {
    constructor(private controllerState: ControllerState) { }

    canActivate() {
        return this.controllerState.active;
    }
}
