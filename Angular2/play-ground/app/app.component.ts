/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"
import { ContactDetails } from "./contact-details.component"
import { ContactsListComponent } from "./contacts-list.component"

@Component({
    selector: 'my-app',
    providers: [ContactsService],
    directives: [ContactDetails, ContactsListComponent],
    template: `
        <contacts-list (selectedEvent)="selected = $event"></contacts-list>

        <contact-details [contact]="selected"></contact-details>
    `
})
export class AppComponent {
    selected: Contact
}