/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {Router} from '@angular/router-deprecated';
import {Contact} from "./contact"
import {ContactsService} from "./contact.service"

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="#person of persons" class="item" [class.active]="selected==person">
                <a (click)="onSelect(person)">{{person.firstName}} {{person.lastName | uppercase}}</a>
                <a (click)="remove(person)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit {
    selected: Contact
    persons: Contact[]
    
    constructor(
        private _personService: ContactsService, 
        private _router: Router
    ) {}
    
    remove(person: Contact) {    
        this._personService.remove(person.id)
        if(person.id==this.selected.id )
            this._router.navigate(['ContactDetails', {id: null}])
    }
    
    onSelect(person: Contact) {
        this._router.navigate(['ContactDetails', {id: person.id}])
    }
    
    ngOnInit() {
        this.persons = this._personService.getAll();
        
        this._router.subscribe(state => {
            let id = +state.instruction.params.id
            
            if( id > 0)
                if(!this.selected || this.selected.id != id)
                    this.selected = this._personService.getById(id)
            else
                this.selected = null;
        })
    }
 }
