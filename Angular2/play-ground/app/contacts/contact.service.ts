/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Injectable } from "@angular/core"
import { Contact } from "./contact"
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Http, Response } from "@angular/http"

const CONTACTS_URL = 'contacts.json'

@Injectable()
export class ContactsService {
	static _contactId = 1;
	private CONTACTS : Contact[]

	constructor(private http: Http) {}
		
	getAll() {
		return this.http.get(CONTACTS_URL)
			.map((res: Response) => {
				this.CONTACTS = res.json()
				return this.CONTACTS
			})
	}
	
	getById(id: number) {
		return this.findById(id);
	}
	
	remove(id: number) {
		let ind = this.findIndexById(id);
		if( ind>=0 )
			this.CONTACTS.splice(ind, 1);
	}
	
	update(contact: Contact) {
		let ind = this.findIndexById(contact.id);
		if( ind<0 ) return null;
		
		this.CONTACTS.splice( ind, 1, contact );
		
		return contact.id;
	}
	
	add(contact: Contact) {
		contact.id = ContactsService._contactId++;
		
		this.CONTACTS.push( contact );
		
		return contact.id;
	}
	
	private findById(contactId: number): Contact {
		return this.CONTACTS.find(row => row.id == contactId )
	}
	
	private findIndexById(contactId: number) {
		let contact = this.findById(contactId);
		if( !contact ) return -1;
		
		return this.CONTACTS.indexOf(contact);
	}
}