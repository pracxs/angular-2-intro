define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _CONTACTS = [
        { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ];
    var ContactsService = (function () {
        function ContactsService() {
            this.CONTACTS = _CONTACTS;
        }
        ContactsService.prototype.getAll = function () {
            return this.CONTACTS;
        };
        ContactsService.prototype.getById = function (id) {
            return this.findById(id);
        };
        ContactsService.prototype.remove = function (id) {
            var ind = this.findIndexById(id);
            if (ind >= 0)
                this.CONTACTS.splice(ind, 1);
        };
        ContactsService.prototype.findById = function (contactId) {
            return this.CONTACTS.find(function (row) {
                return row.id == contactId;
            });
        };
        ContactsService.prototype.findIndexById = function (contactId) {
            var contact = this.findById(contactId);
            if (!contact)
                return -1;
            return this.CONTACTS.indexOf(contact);
        };
        ContactsService.prototype.update = function (contact) {
            var ind = this.findIndexById(contact.id);
            if (ind < 0)
                return null;
            this.CONTACTS.splice(ind, 1, contact);
            return contact.id;
        };
        ContactsService.prototype.add = function (contact) {
            contact.id = ++ContactsService._contactId;
            this.CONTACTS.push(contact);
            return contact.id;
        };
        return ContactsService;
    }());
    ContactsService._contactId = 5;
    exports.ContactsService = ContactsService;
});
//# sourceMappingURL=contacts.service.js.map