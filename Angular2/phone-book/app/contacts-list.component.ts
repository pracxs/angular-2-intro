import {Component, OnInit} from 'angular2/core'
import {Person} from "./person"
import {ContactsService} from "./contact.service"

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="#person of persons" class="item" [class.active]="selected==person">
                <a (click)="selected = person">{{person.firstName}} {{person.lastName | uppercase}}</a>
                <a (click)="remove(person)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit {
    selected: Person
    
    persons: Person[]
    
    constructor(private _personService: ContactsService) {}
    
    remove(person: Person) {
        if(person.id==this.selected.id )
            this.selected = null
            
        this._personService.remove(person.id);
    }
    
    ngOnInit() {
        this.persons = this._personService.getAll();
    }
 }
