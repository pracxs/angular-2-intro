/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

/// <reference path="contact-service.ts" />
/// <reference path="controller.ts" />

function bootstrapApp() {
	let contactsService = new ContactsService();
	let controller = new Controller(contactsService);
	
	(<any>window).ctrl = controller;
	
	controller.drawContactsList();
}

bootstrapApp();