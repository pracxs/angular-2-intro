import {Component, OnInit} from 'angular2/core';
import {ContactsListComponent} from "./contacts-list.component"
import {ContactDetailsComponent} from "./contact-details.component"
import {ContactsService} from "./contact.service"
import {Person} from "./person"

@Component({
    selector: 'my-app',
    template: `
        <contacts-list #list></contacts-list>
        <contact-details [contact]="list.selected"></contact-details>
    `,
    directives: [ContactsListComponent, ContactDetailsComponent],
    providers: [ContactsService]
})
export class AppComponent {}