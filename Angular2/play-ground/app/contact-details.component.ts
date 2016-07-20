import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { Contact } from "./contact"

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a class="text-danger" (click)="showEdit=true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form name="editContactForm" *ngIf="showEdit" novalidate>
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [(ngModel)]="contact.firstName"><br/>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [(ngModel)]="contact.lastName"><br/>
                
                <label for="email">email: </label>
                <input id="email" name="email" [(ngModel)]="contact.email"><br/>
                
                <label></label>
                <input type="submit" class="btn btn-danger" value="{{ !contact.id ? 'Add' : 'Save' }}" />
                <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `
})
export class ContactDetails implements OnChanges {
    @Input()
    contact: Contact

    showEdit: boolean = false

    ngOnChanges(changes) {
        if(changes && changes.contact && changes.contact.currentValue!==changes.contact.previousValue)
            this.showEdit = false
    }
}