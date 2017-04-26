/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input, Output, EventEmitter } from '@angular/core'
import { NgForm }           from "@angular/forms"
import { ContactsService }  from "./contacts.service"

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a href="#" class="text-danger" (click)="showEdit = true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form name="editContactForm" #form="ngForm" (ngSubmit)="onSubmit(form)" *ngIf="showEdit">
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [ngModel]="contact.firstName"><br/>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [ngModel]="contact.lastName"><br/>
                
                <label for="email">email: </label>
                <input id="email" name="email" [ngModel]="contact.email"><br/>
                
                <label></label>
                <input type="submit" value="Save" class="btn btn-danger" />
                <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `
})
export class ContactDetailsComponent {
    @Input()
    contact: Contact
    
    @Output()
    contactChange = new EventEmitter<Contact>()

    showEdit = false

    constructor(private contactsService: ContactsService) {}

    onCancel() {
        this.showEdit = false
    }

    onSubmit(form: NgForm) {
        let dirtyContact: Contact = form.value
        dirtyContact.id = this.contact.id

        this.contactsService.update(dirtyContact)
        this.contact = dirtyContact

        this.contactChange.emit(dirtyContact)

        this.showEdit = false
    }
}