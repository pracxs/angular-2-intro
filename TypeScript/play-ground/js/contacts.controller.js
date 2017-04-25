System.register(["./edit-mode.enum"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var edit_mode_enum_1, Controller;
    return {
        setters: [
            function (edit_mode_enum_1_1) {
                edit_mode_enum_1 = edit_mode_enum_1_1;
            }
        ],
        execute: function () {
            Controller = (function () {
                function Controller(contactsService) {
                    this.contactsService = contactsService;
                }
                Controller.prototype.drawContactsList = function () {
                    var contacts = this.contactsService.getAll();
                    var html = '<ul>';
                    for (var ind in contacts) {
                        var contact = contacts[ind];
                        html +=
                            "<li class='item" + (this.selectedId == contact.id ? ' active' : '') + "'>" +
                                "<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
                                "<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
                                "</li>";
                    }
                    html += '</ul>';
                    var contactsListContainer = document.getElementById('contactsListContainer');
                    contactsListContainer.innerHTML = html;
                };
                Controller.prototype.select = function (event, contactId) {
                    this.selectedId = contactId;
                    this.drawContactsList();
                    this.drawViewDetails(contactId);
                    event.preventDefault();
                    return false;
                };
                Controller.prototype.drawViewDetails = function (contactId) {
                    var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
                    var contact = this.contactsService.getById(contactId);
                    contactsDetailsContainer.innerHTML =
                        '<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
                            '<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
                            '<label>email: </label><b>' + contact.email + '</b><br/>' +
                            '<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
                };
                Controller.prototype.clearDetails = function () {
                    var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
                    contactsDetailsContainer.innerHTML = '';
                };
                Controller.prototype.remove = function (event, clientId) {
                    if (this.selectedId == clientId)
                        this.clearDetails();
                    this.contactsService.remove(clientId);
                    this.drawContactsList();
                    event.preventDefault();
                    return false;
                };
                Controller.prototype.add = function (event) {
                    this.editMode = edit_mode_enum_1.EditMode.ADD;
                    this.selectedId = null;
                    this.drawContactsList();
                    this.drawEditDetails(null); // add new contact
                    event.preventDefault();
                    return false;
                };
                Controller.prototype.edit = function (event, clientId) {
                    this.editMode = edit_mode_enum_1.EditMode.EDIT;
                    this.drawEditDetails(clientId);
                    event.preventDefault();
                    return false;
                };
                Controller.prototype.drawEditDetails = function (contactId) {
                    var contact = !contactId ? { id: '', firstName: '', lastName: '', email: '' } : this.contactsService.getById(contactId);
                    var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
                    contactsDetailsContainer.innerHTML =
                        '<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
                            '<input name="id" type="hidden" value="' + contact.id + '">' +
                            '<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
                            '<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
                            '<label>email: </label><input name="email" value="' + contact.email + '"><br/>' +
                            '<label></label><input type="submit" class="btn btn-danger" value="' + (!contactId ? 'Add' : 'Save') + '"/>' +
                            '<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
                            '</form>';
                    var firstNameInput = document.editContactForm.firstName;
                    firstNameInput.focus();
                    firstNameInput.select();
                };
                Controller.prototype.cancelEdit = function (event) {
                    if (this.editMode == edit_mode_enum_1.EditMode.EDIT)
                        this.drawViewDetails(this.selectedId);
                    else
                        this.clearDetails();
                    event.preventDefault();
                    return false;
                };
                Controller.prototype.submit = function (event) {
                    event.preventDefault();
                    var fomValid = this.validate();
                    if (!fomValid)
                        return;
                    this.save();
                    return false;
                };
                Controller.prototype.validate = function () {
                    var res = false;
                    var form = document.editContactForm;
                    if (!form.firstName.value)
                        alert('First name is mandatory');
                    else if (!form.lastName.value)
                        alert('Last name is mandatory');
                    else if (form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value))
                        alert('Invalid email');
                    else
                        res = true;
                    return res;
                };
                Controller.prototype.save = function () {
                    var form = document.editContactForm;
                    var client = {
                        id: form.id.value,
                        firstName: form.firstName.value,
                        lastName: form.lastName.value,
                        email: form.email.value
                    };
                    var contactId;
                    if (this.editMode == edit_mode_enum_1.EditMode.ADD)
                        contactId = this.contactsService.add(client);
                    else
                        contactId = this.contactsService.update(client);
                    this.selectedId = contactId;
                    this.drawContactsList();
                    this.drawViewDetails(this.selectedId);
                };
                return Controller;
            }());
            exports_1("Controller", Controller);
        }
    };
});
//# sourceMappingURL=contacts.controller.js.map