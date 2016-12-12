/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {Component, OnInit} from '@angular/core'
import {ContactsService} from './contacts.service'

@Component({
    selector: 'my-app',
    styles: ['.hide { display: none !important; }'],
    template: `
        <ul>
            <li [class.active]="contact == selected" *ngFor="let contact of contacts" class='item'> 
                <a href='#' (click)="selected = contact">{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
		</ul>
    `
})
export class AppComponent implements OnInit {
    contacts: Contact[]
    selected: Contact

    constructor(private contactsService: ContactsService) {}

    ngOnInit() {
        this.contactsService.getAll()
            .then(
                data => this.contacts = data
            )
    }
}