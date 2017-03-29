/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input } from '@angular/core'
import { Contact } from './contact'

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
            <form name="editContactForm" *ngIf="showEdit">
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [value]="contact.firstName" required><br/>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [value]="contact.lastName" required><br/>
                
                <label for="email">email: </label>
                <input id="email" name="email" [value]="contact.email" email><br/>
                
                <label></label>
                <input type="submit" class="btn btn-danger" value="Save" />
                <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `
})
export class ContactDetailsComponent {
    @Input()
    contact: Contact
    showEdit: boolean = false

    onCancel() {
        this.showEdit = false
    }
}