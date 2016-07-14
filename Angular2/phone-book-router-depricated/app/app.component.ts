/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ContactsListComponent} from "./contacts-list.component"
import {ContactDetailsComponent} from "./contact-details.component"
import {ContactsService} from "./contact.service"
import {Contact} from "./contact"

@Component({
    selector: 'my-app',
    template: `
        <contacts-list></contacts-list>
        
        <a id="add" class="text-danger" [routerLink]="['ContactDetails', {id: -1}]"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <router-outlet></router-outlet>
    `,
    directives: [ContactsListComponent, ROUTER_DIRECTIVES],
    providers: [ContactsService]
})
@RouteConfig([
  {path:'/:id', name: 'ContactDetails', component: ContactDetailsComponent, useAsDefault: true}
])
export class AppComponent {}