import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Contact } from './contact.interface'
import { ContactsService } from './contacts.service';

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{ contact.firstName }}</b><br/>
                <label>Last Name: </label><b>{{ contact.lastName }}</b><br/>
                <label>email: </label><b>{{ contact.email }}</b><br/>
                <label></label><a href="#" class="text-danger" (click)="showEdit=true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form #form="ngForm" (ngSubmit)="$event.preventDefault(); submit(form)" name="editContactForm" *ngIf="showEdit" novalidate>
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [ngModel]="contact.firstName" required><br/>

                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [ngModel]="contact.lastName" required><br/>
                
                <label for="email">email: </label>
                <input id="email" name="email" [ngModel]="contact.email"><br/>
                
                <label></label>
                <input type="submit" class="btn btn-danger" value="Save" />
                <a href="#" class="text-danger">Cancel</a>
            </form>
        </div>
    `
})
export class ContactDetailsComponent implements OnChanges {
    @Input()
    contact: Contact
    @Output()
    contactChange = new EventEmitter<Contact>()

    showEdit: boolean

    constructor(private contactsService: ContactsService) {}

    submit(form: NgForm) {
        
        if(! form.valid) return;

        let dirtyContact: Contact = form.value
        dirtyContact.id = this.contact.id
        
        if(this.contact.id === null)
            this.contactsService.add(dirtyContact)   
        else
            this.contactsService.update(dirtyContact)
            
        this.contact = dirtyContact
         
        this.contactChange.emit( dirtyContact )

        this.showEdit = false
    }

    ngOnChanges(changes) {
        if(changes && changes.contact && changes.contact.currentValue!==changes.contact.previousValue)
            this.showEdit = false
    }
}