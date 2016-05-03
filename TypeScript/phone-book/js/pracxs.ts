	
class ContactsService {
	static _contactId = 5
	
	private CONTACTS = [
			{ id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
			{ id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
			{ id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
			{ id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
			{ id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
		];
		
	getAll() {
		return this.CONTACTS;
	}
	
	getById(id) {
		return this.findById(id);
	}
	
	remove(id) {
		var ind = this.findIndexById(id);
		if( ind>=0 )
			this.CONTACTS.splice(ind,1);
	}
	
	update(contact) {
		var ind = this.findIndexById(contact.id);
		if( ind<0 ) return null;
		
		this.CONTACTS.splice( ind, 1, contact );
		
		return contact.id;
	}
	
	add(contact) {
		contact.id = ++ContactsService._contactId;
		
		this.CONTACTS.push( contact );
		
		return contact.id;
	}
	
	private findById(contactId) {
		return (<any>this.CONTACTS).find(function(row){
			return row.id == contactId;
		});
	}
	
	private findIndexById(contactId) {
		var contact = this.findById(contactId);
		if( !contact ) return -1;
		
		return this.CONTACTS.indexOf(contact);
	}
}

class Controller {
	constructor(private contactsService: ContactsService) {}
	
	selectedId: number
	
	drawContactsList() {
		var contacts = this.contactsService.getAll();
		
		var html = '';
		for( var ind in contacts ) {
			var contact = contacts[ind];
			html += 
				"<div class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
					"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
					"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
				"</div>";
		}
		
		var contactsListContainer = document.getElementById('contactsListContainer');
		contactsListContainer.innerHTML = html;
	}
	
	drawViewDetails(contactId) {
		var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		var contact = this.contactsService.getById(contactId);
		contactsDetailsContainer.innerHTML = 
			'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
			'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
			'<label>email: </label><b>' + contact.email + '</b><br/>' +
			'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
	}
	
	drawEditDetails(contactId) {
		
		var contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId);
		
		var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		contactsDetailsContainer.innerHTML = 
			'<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
				'<input name="id" type="hidden" value="' + contact.id + '">' +
				'<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
				'<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
				'<label>email: </label><input name="email" value="' + contact.email + '"><br/>' +
				'<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
				'<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
			'</form>';
		
		var firstNameInput = (<any>document).editContactForm.firstName;	
		firstNameInput.focus();
		firstNameInput.select();
	}
	
	select (event, contactId) {
		this.selectedId = contactId;
			
		this.drawContactsList();
		this.drawViewDetails(contactId);
		
		event.preventDefault();
		return false;
	}
	
	clearDetails () {
		var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		contactsDetailsContainer.innerHTML = '';
	}
	
	remove (event, clientId) {
		if( this.selectedId==clientId )
			this.clearDetails();
			
		this.contactsService.remove(clientId);
		this.drawContactsList();
		
		event.preventDefault();
		return false;
	}
	
	add (event) {
		this.editMode = 'add';
		
		this.selectedId = null;
		
		this.drawContactsList();
		this.drawEditDetails(null); // add new contact
		
		event.preventDefault();
		return false;
	}
	
	edit(event, clientId) {
		this.editMode = 'edit';
		
		this.drawEditDetails(clientId);
		
		event.preventDefault();
		return false;
	}
	
	cancelEdit(event) {
		if( this.editMode == 'edit') 
			this.drawViewDetails( this.selectedId );
		else
			this.clearDetails();
		
		event.preventDefault();
		return false;
	}
	
	validate() {
		var res = false;
		var form = (<any>document).editContactForm;
		
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
		var form = (<any>document).editContactForm;
		
		var client = {
				id: form.id.value,
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				email: form.email.value
			}
		
		var contactId;
		if( this.editMode == 'add' )
			contactId = this.contactsService.add(client);
		else
			contactId = this.contactsService.update(client);
			
		this.selectedId = contactId;
		this.drawContactsList();
		this.drawViewDetails( this.selectedId );
	}
	
	submit(event) {
		event.preventDefault();
		
		var fomValid = this.validate();
		if( !fomValid ) return;
		
		this.save();
		
		return false;
	}
}

function bootstrap() {
	var contactsService = new ContactsService();
	var controller = new Controller(contactsService);
	
	(<any>window).ctrl = controller;
	
	controller.drawContactsList();
}

bootstrap();