import {Injectable} from "angular2/core"
import {Http, Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {Person} from "./person"

const CONTACTS_URL = 'contacts.json'

@Injectable()
export class ContactsService {
	private static _contactId = 1;
	
	constructor(private http: Http) {}
	
	getAll(): Observable<Person[]> {
		return this.http.get(CONTACTS_URL)
                    .map((res: Response) => {
						let data: Person[] = this.extractData(res)
						 
						data.map((val) => { ContactsService._contactId = Math.max(val.id, ContactsService._contactId) })
						ContactsService._contactId++;
						 
						return data;
					})
                    .catch(this.handleError)
	}
	
	getById(id: number) {
		return this.findById(id);
	}
	
	remove(id: number) {
		throw {name: 'Unimplemented', message: 'Unimpemented functionality'}
	}
	
	update(contact: Person) {
		throw {name: 'Unimplemented', message: 'Unimpemented functionality'}
	}
	
	add(contact: Person) {
		throw {name: 'Unimplemented', message: 'Unimpemented functionality'}
	}
	
	private findById(contactId: number): Person {
		throw {name: 'Unimplemented', message: 'Unimpemented functionality'}
	}
	
	private findIndexById(contactId: number) {
		throw {name: 'Unimplemented', message: 'Unimpemented functionality'}
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
		let errMsg = error.message || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}