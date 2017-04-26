/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { ContactsService } from './contacts.service'

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="let contact of contacts" class="item" [class.active]="selected == contact">
                <a href='#' (click)='onSelect(contact)'>{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit {
    contacts: Contact[]

    @Input()
    selected: Contact
    
    @Output()
    selectedEvent = new EventEmitter<Contact>()

    constructor(private contactsService: ContactsService) {}

    onSelect(contact: Contact) {
        this.selected = contact
        this.selectedEvent.emit(contact)
    }

    ngOnInit() {
        this.contacts = this.contactsService.getAll()
    }
}