import {Component, OnInit} from '@angular/core';
import {ContactsListComponent} from "./contacts-list.component"
import {ContactDetailsComponent} from "./contact-details.component"
import {ContactsService} from "./contact.service"
import {Person} from "./person"

@Component({
    selector: 'my-app',
    template: `
        <contacts-list [(selected)]="selected"></contacts-list>
        
        <a id="add" href="#" class="text-danger" (click)="onAdd()"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <contact-details [(contact)]="selected"></contact-details>
    `,
    directives: [ContactsListComponent, ContactDetailsComponent],
    providers: [ContactsService]
})
export class AppComponent {
    selected: Person
    
    onAdd() {
        this.selected = {id: null, firstName: '', lastName: '', email: ''}
    }
}