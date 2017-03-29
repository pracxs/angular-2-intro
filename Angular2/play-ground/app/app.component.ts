/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit } from '@angular/core'
import { Contact } from './contact'
import { ContactsService } from './contact.service'

@Component({
    selector: 'my-app',
    providers: [ ContactsService ],
    template: `
        <ul> 
            <li [class.active]="contact==selected" class='item' *ngFor="let contact of contacts">
                <a href='#' (click)="select(contact)">{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' (click)='remove(contact)' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
		</ul>
        <div id="contactsDetailsContainer" *ngIf="selected">
            <label>First Name: </label><b>{{selected.firstName}}</b><br/>
            <label>Last Name: </label><b>{{selected.lastName}}</b><br/>
            <label>email: </label><b>{{selected.email}}</b><br/>
            <label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' selected.id)"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
    `
})
export class AppComponent implements OnInit {
    contacts: Contact[]
    selected: Contact 

    constructor(private contactsService: ContactsService) {}

    ngOnInit() {
        this.contacts = this.contactsService.getAll()
    }

    select(c: Contact) {
        this.selected = c
    }

    remove(contact: Contact) {
        this.contactsService.remove(contact.id)
    }
}