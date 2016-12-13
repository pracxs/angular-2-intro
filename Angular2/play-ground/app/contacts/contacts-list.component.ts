/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ContactsService }   from './contacts.service'
import 'rxjs/add/operator/switchMap'
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li [class.active]="contact == selected" *ngFor="let contact of contacts" class='item'> 
                <a href='#' (click)="select( contact )">{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
		</ul>
    `
})
export class ContactsListComponent implements OnInit, OnDestroy {
    contacts: Contact[]

    @Input()
    selected: Contact

    @Output()
    selectedChange = new EventEmitter<Contact>()

    private sub: Subscription

    constructor(
        private contactsService: ContactsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.contactsService.getAll()
            .subscribe(
                data => this.contacts = data
            )

       this.sub = this.route.params
            .map( params => + params['id'] )
            .switchMap( id => this.contactsService.getById( id ) )
            .subscribe( contact => {
                this.selected = contact
                this.selectedChange.emit( this.selected ) 
            })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    select(contact: Contact): boolean {
        this.selected = contact
        this.selectedChange.emit( contact )

        this.router.navigate(['contacts', contact.id])

        return false;
    }
}