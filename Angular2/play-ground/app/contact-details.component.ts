/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
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
            <form *ngSwitchDefault #form="ngForm" name="editContactForm" (ngSubmit)="$event.preventDefault(); submit(form)">
                <label>First Name: </label><input name="firstName" [ngModel]="contact.firstName"><br/>
                <label>Last Name: </label><input name="lastName" [ngModel]="contact.lastName"><br/>
                <label>email: </label><input name="email" [ngModel]="contact.email"><br/>
                <label></label><input type="submit" class="btn btn-danger" value="Save"/>
                <a href="#" class="text-danger" (click)="showEdit = false">Cancel</a>
            </form>
        <div>
    `
})
export class ContactDetailsComponent implements OnChanges {
    @Input()
    contact: Contact

    showEdit: boolean = false


    constructor(private contactsService: ContactsService) {}

    submit(form: NgForm) {
        let dirtyContact: Contact = form.value

        dirtyContact.id = this.contact.id

        this.contactsService.update( dirtyContact )
        this.contact = dirtyContact
        this.showEdit = false
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes && changes['contact'] && changes['contact'].currentValue!==changes['contact'].previousValue)
            this.showEdit = false
    }
}