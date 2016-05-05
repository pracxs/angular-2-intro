import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core'
import {Router} from 'angular2/router';
import {Person} from "./person"
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
    selected: Person
    persons: Person[]
    
    constructor(
        private _personService: ContactsService, 
        private _router: Router
    ) {}
    
    remove(person: Person) {    
        this._personService.remove(person.id)
        if(person.id==this.selected.id )
            this._router.navigate(['PersonDetail', {id: null}])
    }
    
    onSelect(person: Person) {
        this._router.navigate(['PersonDetail', {id: person.id}])
    }
    
    ngOnInit() {
        this.persons = this._personService.getAll();
        
        this._router.subscribe(id => {
            if( id!=='' && +id > 0)
                if(!this.selected || this.selected.id != id)
                    this.selected = this._personService.getById(+id)
            else
                this.selected = null;
        })
    }
 }
