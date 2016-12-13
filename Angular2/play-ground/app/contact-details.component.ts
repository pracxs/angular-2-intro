/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'
import { NgForm }           from "@angular/forms"
import { ContactsService }  from './contacts.service'

@Component({
    selector: 'contact-details',
    template: `

        <div *ngIf="contact" id="contactsDetailsContainer" [ngSwitch]="showEdit">
            <span *ngSwitchCase="false">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a href="#" class="text-danger" (click)="showEdit = true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form *ngSwitchDefault #form="ngForm" name="editContactForm" (ngSubmit)="$event.preventDefault(); submit(form)" novalidate>
                <label>First Name: </label><input #spy name="firstName" [ngModel]="contact.firstName" required><br/>
                <label>Last Name: </label><input name="lastName" [ngModel]="contact.lastName" required><br/>
                <label>email: </label><input name="email" [ngModel]="contact.email" email><br/>
                <label></label><input type="submit" class="btn btn-danger" value="Save"/>
                <a href="#" class="text-danger" (click)="showEdit = false">Cancel</a>

                <br/>
                <br/>
                {{spy.className}}
            </form>
        <div>
    `
})
export class ContactDetailsComponent implements OnChanges {
    @Input()
    contact: Contact
    @Output()
    contactChange = new EventEmitter<Contact>()

    showEdit: boolean = false


    constructor(private contactsService: ContactsService) {}

    submit(form: NgForm) {
        if( ! form.valid ) return

        let dirtyContact: Contact = form.value

        dirtyContact.id = this.contact.id

        this.contactsService.update( dirtyContact )
        this.contact = dirtyContact
        this.showEdit = false

        this.contactChange.emit( dirtyContact )
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes && changes['contact'] && changes['contact'].currentValue!==changes['contact'].previousValue)
            this.showEdit = false
    }
}