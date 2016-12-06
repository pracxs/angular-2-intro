import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Contact } from './contact.interface';

@Injectable()
export class ContactsService {
    private contacts: Contact[] = [
        { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ]

    constructor() {}

    getAll(): Promise<Contact[]> {
        return Promise.resolve( this.contacts )
        // return new Promise( resolve => setTimeout( () => resolve(this.contacts), 4000 ) )
    }
}