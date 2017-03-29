/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { Contact } from './contact'
import { ContactsService } from './contact.service'

@Component({
    selector: 'my-app',
    providers: [ ContactsService ],
    template: `
        <contacts-list (contactChanged)="selected = $event"></contacts-list>
        <contact-details [contact]="selected"></contact-details>
    `
})
export class AppComponent {
    selected: Contact
}