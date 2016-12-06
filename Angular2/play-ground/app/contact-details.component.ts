import { Component, Input } from '@angular/core'
import { Contact } from './contact.interface'

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <label>First Name: </label><b>{{ contact.firstName }}</b><br/>
            <label>Last Name: </label><b>{{ contact.lastName }}</b><br/>
            <label>email: </label><b>{{ contact.email }}</b><br/>
            <label></label><a href="#" class="text-danger"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
    `
})
export class ContactDetailsComponent {
    @Input()
    contact: Contact
}