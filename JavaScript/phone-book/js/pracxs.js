/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

'use strict';

(function(exports) {
	'use strict';
	
	function ContactsService() {
		var CONTACTS = [
				{ id: "1", firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
				{ id: "2", firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
				{ id: "3", firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
				{ id: "4", firstName: "John", lastName: "Doe", email: "john@gmail.com" },
				{ id: "5", firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
			];
			
		this.getAll = function () {
			return CONTACTS;
		}
		
		this.getById = function(id) {
			return findById(id);
		}
		
		function findById(contactId) {
			return CONTACTS.find(function(row){
				return row.id == contactId;
			})
		}
	}
	ContactsService._contactId = 5;
	
	function Controller(contactsService) {
		this.contactsService = contactsService;
		
		this.drawContactsList = function() {
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
		
		this.select = function(event, contactId) {
			this.selectedId = contactId;
			 
			this.drawContactsList();
			this.drawViewDetails(contactId);
			
			event.preventDefault();
			return false;
		}
		
		this.drawViewDetails = function(contactId) {
			var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			var contact = this.contactsService.getById(contactId);
			contactsDetailsContainer.innerHTML = 
				'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
				'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
				'<label>email: </label><b>' + contact.email + '</b><br/>' +
				'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
		}
	}
	
	function bootstrap() {
		var contactsService = new ContactsService();
		var controller = new Controller(contactsService);
		
		window.ctrl = controller
		
		controller.drawContactsList()
	}
	
	bootstrap();
})( window );