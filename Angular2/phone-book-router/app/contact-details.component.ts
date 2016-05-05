import {Component, Input, Output, OnInit} from 'angular2/core'
import {Router, RouteParams} from 'angular2/router';
import {NgForm} from 'angular2/common' 
import {Person} from "./person"
import {ContactsService} from "./contact.service"
import {EmailValidator} from "./email-validator.directive"

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a class="text-danger" (click)="showEdit=true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form name="editContactForm" #form="ngForm" (ngSubmit)="onSubmit(form)" *ngIf="showEdit" novalidate>
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [ngModel]="contact.firstName" ngControl="firstName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.firstName && !form.controls.firstName.pristine && !form.controls.firstName.valid">First name is required</div>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [ngModel]="contact.lastName" ngControl="lastName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.lastName && !form.controls.lastName.pristine && !form.controls.lastName.valid">Last name is required</div>
                
                <label for="email">email: </label>
                <input id="email" name="email" [ngModel]="contact.email" ngControl="email" email><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.email && !form.controls.email.valid">Email is invalid</div>
                
                
                <label></label>
                <input type="submit" class="btn btn-danger" value="{{ !contact.id ? 'Add' : 'Save' }}" [disabled]="form.invalid || form.pristine" />
                <a class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `,
    styles: ['.alert {margin-left: 104px;}'],
    directives: [EmailValidator]
})
export class ContactDetailsComponent implements OnInit {
    contact: Person
    showEdit: boolean
    
    constructor(
        private _personService: ContactsService,
        private _router: Router,
        private _routeParams: RouteParams
    ) {}
    
    ngOnInit() {
        let id: number = +this._routeParams.get('id')
        if( id > 0) {
            if(!this.contact || this.contact.id != id)
                this.contact = this._personService.getById(+id)
        } else if(id===-1) {
            this.contact = {id: null, firstName: '', lastName: '', email: ''}
            this.showEdit = true
        }
    }
    
    onSubmit(form: NgForm) {
        if(! form.valid) return;
        
        let dirtyContact: Person = form.value
        dirtyContact.id = this.contact.id
        
        let saveId: number
        if(this.contact.id === null)
            saveId = this._personService.add(dirtyContact)   
        else
            saveId = this._personService.update(dirtyContact);
            
        this._router.navigate(['PersonDetail', {id: saveId}]);
        this.showEdit = false
    }
    
    onCancel() {
        this.showEdit = false
        
        if( this.contact.id === null ) {
            this._router.navigate(['PersonDetail', {id: null}]);
            // this.contactChange.emit(this.contact);
        }
    }
 }
