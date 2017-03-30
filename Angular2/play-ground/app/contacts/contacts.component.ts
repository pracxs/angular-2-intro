/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, ViewChild }     from '@angular/core'
//import { CanComponentDeactivate }   from '../can-deactivate-guard'
import { Observable }               from 'rxjs/Observable'
//import { DialogService }            from "../dialog.service"
import 'rxjs/add/observable/fromPromise'
import { ContactDetailsComponent } from './contact-details.component'
import { ContactsService } from "./contact.service"

@Component({
    selector: 'contacts',
    providers: [ ContactsService ],
    template: `
        <contacts-list></contacts-list>
        
        <a id="add" class="text-danger" [routerLink]="['/contacts', -1]"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <contact-details></contact-details>
    `
})
export class ContactsComponent {}