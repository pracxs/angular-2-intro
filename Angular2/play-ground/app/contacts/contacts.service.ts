import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Contact } from './contact.interface';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ContactsService {
    static _contactId = 6

    private contacts: Contact[] = [
        { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ]

    constructor(private http: Http) {}

    getAll(): Promise<Contact[]> {
        return this.http.get('contacts.json').toPromise()
			.then( response => response.json() )
    }

    getById(id: number) {
		return this.findById(id);
	}
	
	remove(id: number) {
		let ind = this.findIndexById(id);
		if( ind>=0 )
			this.contacts.splice(ind, 1);
	}
	
	update(contact: Contact) {
		let ind = this.findIndexById(contact.id);
		if( ind<0 ) return null;
		
		this.contacts.splice( ind, 1, contact );
		
		return contact.id;
	}
	
	add(contact: Contact) {
		contact.id = ContactsService._contactId++;
		
		this.contacts.push( contact );
		
		return contact.id;
	}
	
	private findById(contactId: number): Contact {
		return this.contacts.find(row => row.id == contactId )
	}
	
	private findIndexById(contactId: number) {
		let contact = this.findById(contactId);
		if( !contact ) return -1;
		
		return this.contacts.indexOf(contact);
	}
}