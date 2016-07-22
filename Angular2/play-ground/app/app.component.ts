/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {Component, OnInit} from '@angular/core';
import {ContactsComponent} from "./contacts/contacts.component"

@Component({
    selector: 'my-app',
    template: `
        <contacts>Loading...</contacts>
    `,
    directives: [ContactsComponent]
})
export class AppComponent {}