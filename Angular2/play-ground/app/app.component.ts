/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'

let _CONTACTS: Contact[] = [
            { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
            { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
            { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
            { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
            { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
        ];

@Component({
    selector: 'my-app',
    template: `
        <ul>
            <li *ngFor="let contact of contacts" class="item" [class.active]="selected == contact">
                <a href='#' (click)='onSelect(contact)'>{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>

        <div id="contactsDetailsContainer" *ngIf="selected">
            <label>First Name: </label><b>{{selected?.firstName}}</b><br/>
            <label>Last Name: </label><b>{{selected?.lastName}}</b><br/>
            <label>email: </label><b>{{selected?.email}}</b><br/>
            <label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
    `
})
export class AppComponent {
    contacts = _CONTACTS
    selected: Contact

    onSelect(contact: Contact) {
        this.selected = contact
    }
}