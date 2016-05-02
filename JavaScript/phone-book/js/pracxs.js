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
	}
	ContactsService._contactId = 5;
	
	function Controller(contactsService) {
		this.contactsService = contactsService;
		

	}
	
	function bootstrap() {
		var contactsService = new ContactsService();
		var controller = new Controller(contactsService);
		
	}
	
	bootstrap();
})( window );