/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { Contact } from './contact'

const CONTACTS: Contact[] = [
    { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
    { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
    { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
    { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
    { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
];

@Component({
    selector: 'my-app',
    template: `
        <ul #box> 
            <li [class.active]="contact==selected" class='item' *ngFor="let contact of contacts">
                <a href='#' (click)="select(contact)">{{contact.firstName}} {{contact.lastName | uppercase}}</a>
                <a href='#' onclick='ctrl.remove(event, contact)' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
		</ul>
        <div id="contactsDetailsContainer" *ngIf="selected">
            <label>First Name: </label><b>{{selected.firstName}}</b><br/>
            <label>Last Name: </label><b>{{selected.lastName}}</b><br/>
            <label>email: </label><b>{{selected.email}}</b><br/>
            <label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' selected.id)"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
        <pre>
            {{box | json}}
        </pre>
    `
})
export class AppComponent {
    contacts: Contact[] = CONTACTS
    selected: Contact 

    select(c: Contact) {
        this.selected = c
    }
}