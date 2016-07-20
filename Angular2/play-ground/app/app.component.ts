/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
        <ul>
            <li class="item" [class.active]="selected==contact" *ngFor="let contact of CONTACTS">
                <a href='#' (click)='selected=contact'>{{contact.firstName}} {{contact.lastName}}</a>
				<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>
    `
})
export class AppComponent {
    CONTACTS = [
			{ id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
			{ id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
			{ id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
			{ id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
			{ id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
		]

    selected: any
}