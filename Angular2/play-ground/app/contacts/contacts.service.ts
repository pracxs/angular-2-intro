import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

const CONTACTS_URL = 'contacts.json'

@Injectable()
export class ContactsService {
	private static _contactId = 6

    contacts: Contact[] = [
				{ id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
				{ id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
				{ id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
				{ id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
				{ id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
			]

	constructor( private http: Http) {}

    getAll(): Observable<Contact[]> {
        return Observable.create( observer => observer.next( this.contacts ) )
    }

	getById(id: number): Observable<Contact> {
		return Observable.create( observer => observer.next( this.findById(id)) )
	}
	
	remove(id: number): void {
		var ind = this.findIndexById(id);
		if( ind>=0 )
			this.contacts.splice(ind,1);
	}
	
	findById(contactId: number): Contact {
		return this.contacts.find(function(row){
			return row.id == contactId;
		})
	}
	
	private findIndexById(contactId: number): number {
		var contact = this.findById(contactId);
		if( !contact ) return -1;
		
		return this.contacts.indexOf(contact);
	}
	
	update(contact: Contact): number {
		var ind = this.findIndexById(contact.id);
		if( ind<0 ) return null;
		
		this.contacts.splice( ind, 1, contact );
		
		return contact.id;
	}
	
	add(contact: Contact): number {
		contact.id = ++ContactsService._contactId;
		
		this.contacts.push( contact );
		
		return contact.id;
	}

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body || { };
	}

	private handleError (error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		let errMsg = error.message || error.status + ' ' + error.statusText + ': ' + error.url || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}