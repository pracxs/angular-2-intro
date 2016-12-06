/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { Contact } from './contact.interface'

@Component({
    selector: 'my-app',
    template: `
        <ul>
            <li [class.active]="selected==contact" *ngFor="let contact of contacts" class='item'>
                <a href='#' (click)="select(contact)">{{contact.firstName}} {{contact.lastName | myUpper }}</a>
                <a href='#' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>

        <contact-details [contact]="selected"></contact-details>
    `
})
export class AppComponent {
    contacts = [
        { id: "1", firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: "2", firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: "3", firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: "4", firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: "5", firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ]

    selected: Contact

    select(contact: Contact): void {
        this.selected = contact
    }
}