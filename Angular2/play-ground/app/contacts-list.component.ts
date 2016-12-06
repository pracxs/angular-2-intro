/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Contact } from "./contact.interface"
import { ContactsService } from './contacts.service';

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="let contact of contacts" class="item" [class.active]="selected==contact">
                <a (click)="select(contact)">{{contact.firstName}} {{contact.lastName | uppercase}}</a>
                <a (click)="remove(contact)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit {
    contacts: Contact[]

    @Input()
    selected: Contact

    @Output()
    selectedChange = new EventEmitter<Contact>()

    constructor(private contactsService: ContactsService) {}

    select(contact: Contact): void {
        this.selected = contact
        this.selectedChange.emit( contact )
    }

    ngOnInit() {
        this.contactsService.getAll()
            .then( data => this.contacts = data )
    }
}
