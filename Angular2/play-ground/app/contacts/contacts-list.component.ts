/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, EventEmitter } from '@angular/core'
import { ContactsService } from './contacts.service'
import { Router, ActivatedRoute, Params } from "@angular/router"
import 'rxjs/add/operator/map'

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="let contact of contacts" class="item" [class.active]="selected == contact">
                <a href='#' (click)='onSelect(contact)'>{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' (click)='onRemove(contact)' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit {
    contacts: Contact[]
    selected: Contact

    constructor(
        private contactsService: ContactsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    onSelect(contact: Contact) {
        this.router.navigate(['contacts', contact.id])
        return false;
    }

    ngOnInit() {
        this.contacts = this.contactsService.getAll()

        this.route.params
            .map((params: Params) => +params['id'])
            .subscribe(contactId => this.selected = this.contactsService.getById(contactId))
    }

    onRemove(contact: Contact): void {
        this.contactsService.remove(contact.id)
        if(contact===this.selected) {
            this.selected = null
            this.router.navigate(['contacts'])
        }
    }
}