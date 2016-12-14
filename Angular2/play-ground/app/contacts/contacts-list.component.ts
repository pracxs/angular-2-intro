/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'
import { ContactsService }   from './contacts.service'
import 'rxjs/add/operator/switchMap'
import { Subscription } from 'rxjs/Subscription'

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li [class.active]="contact.id == selectedId" *ngFor="let contact of contacts" class='item'> 
                <a href='#' (click)="select( contact )">{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' (click)="remove(contact)" class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
		</ul>
    `
})
export class ContactsListComponent implements OnInit, OnDestroy {
    contacts: Contact[]

    selectedId: number

    private sub: Subscription

    constructor(
        private contactsService: ContactsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        console.log('Contacts List inited...')

        this.contactsService.getAll()
            .subscribe(
                data => this.contacts = data
            )

        this.sub = this.route
            .params
            .map((params: Params) => +params['id'])
            .subscribe(contactId => this.selectedId = contactId)
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    select(contact: Contact): boolean {
        this.router.navigate(['contacts', contact.id])

        return false;
    }

    remove(contact: Contact): boolean {
        if(contact.id==this.selectedId )
            this.router.navigate(['/contacts'])
                .then( (success) => success && this.contactsService.remove(contact.id) )
        else
            this.contactsService.remove(contact.id)

        return false;
    }
}