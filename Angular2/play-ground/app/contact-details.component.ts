/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input } from '@angular/core'

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <label>First Name: </label><b>{{contact.firstName}}</b><br/>
            <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
            <label>email: </label><b>{{contact.email}}</b><br/>
            <label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
    `
})
export class ContactDetailsComponent {
    @Input()
    contact: Contact
}