/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { DialogService } from "./dialog.service"

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    providers: [DialogService],
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}