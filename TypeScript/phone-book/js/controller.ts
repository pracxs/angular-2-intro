/// <reference path="person.ts"/>
/// <reference path="edit-mode.ts"/>
/// <reference path="person-edit-form-element.ts"/>

class Controller {
	constructor(private contactsService: ContactsService) {}

	selectedId: number
	editMode: EditMode
	printContacts: Person[]
	
	drawContactsList() {
		let contacts = this.contactsService.getAll();
		
		let html = '';
		for( let ind in contacts ) {
			let contact = contacts[ind];
			html += 
				"<div class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
					"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
					"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
				"</div>";
		}
		
		let contactsListContainer = document.getElementById('contactsListContainer');
		contactsListContainer.innerHTML = html;
	}
	
	drawViewDetails(contactId) {
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		let contact = this.contactsService.getById(contactId);
		contactsDetailsContainer.innerHTML = 
			'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
			'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
			'<label>email: </label><b>' + contact.email + '</b><br/>' +
			'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
	}
	
	drawEditDetails(contactId) {
		
		let contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId);
		
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		contactsDetailsContainer.innerHTML = 
			'<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
				'<input name="id" type="hidden" value="' + contact.id + '">' +
				'<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
				'<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
				'<label>email: </label><input name="email" value="' + contact.email + '"><br/>' +
				'<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
				'<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
			'</form>';
		
		let firstNameInput = (<any>document).editContactForm.firstName;	
		firstNameInput.focus();
		firstNameInput.select();
	}
	
	select(event, contactId) {
		this.selectedId = contactId;
			
		this.drawContactsList();
		this.drawViewDetails(contactId);
		
		event.preventDefault();
		return false;
	}
	
	clearDetails() {
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		contactsDetailsContainer.innerHTML = '';
	}
	
	remove(event, clientId) {
		if( this.selectedId==clientId )
			this.clearDetails();
			
		this.contactsService.remove(clientId);
		this.drawContactsList();
		
		event.preventDefault();
		return false;
	}
	
	add(event) {
		this.editMode = EditMode.Add;
		
		this.selectedId = null;
		
		this.drawContactsList();
		this.drawEditDetails(null); // add new contact
		
		event.preventDefault();
		return false;
	}
	
	edit(event, clientId) {
		this.editMode = EditMode.Modify;
		
		this.drawEditDetails(clientId);
		
		event.preventDefault();
		return false;
	}
	
	cancelEdit(event) {
		if( this.editMode == EditMode.Modify) 
			this.drawViewDetails( this.selectedId );
		else
			this.clearDetails();
		
		event.preventDefault();
		return false;
	}
	
	validate() {
		let res = false;
		let form = (<any>document).editContactForm;
		
		if( !form.firstName.value )
			alert('First name is mandatory');
		else if( !form.lastName.value )
			alert('Last name is mandatory');
		else if( form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value) )
			alert('Invalid email');
		else
			res = true;
		
		return res;
	}
	
	save() {
		let form = <PersonEditFormElement>(<any>document).editContactForm;
		
		let client: Person = {
				id: +form.id.value,
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				email: form.email.value
			}
		
		let contactId;
		if( this.editMode == EditMode.Add )
			contactId = this.contactsService.add(client);
		else
			contactId = this.contactsService.update(client);
			
		this.selectedId = contactId;
		this.drawContactsList();
		this.drawViewDetails( this.selectedId );
	}
	
	submit(event: Event) {
		event.preventDefault();
		
		let fomValid = this.validate();
		if( !fomValid ) return;
		
		this.save();
		
		return false;
	}
	
	removeAll() {
		let contacts = this.contactsService.getAll()
		
		// contacts.forEach(v => this.contactsService.remove(v.id) ) 
		contacts.forEach(function(v) { 
			this.contactsService.remove(v.id)
		})
			
		this.drawContactsList()
	}
}