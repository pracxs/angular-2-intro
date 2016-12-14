/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, ViewChild } from '@angular/core'
import { NgForm }                   from "@angular/forms"
import { Router, ActivatedRoute }   from '@angular/router'
import { ContactsService }          from './contacts.service'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/filter'
import { Subscription }             from 'rxjs/Subscription'

@Component({
    selector: 'contact-details',
    template: `

        <div *ngIf="contact" id="contactsDetailsContainer" [ngSwitch]="showEdit">
            <span *ngSwitchCase="false">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a href="#" class="text-danger" (click)="$event.preventDefault(); showEdit = true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form *ngSwitchDefault #form="ngForm" name="editContactForm" (ngSubmit)="$event.preventDefault(); submit(form)" novalidate>
                <label>First Name: </label><input name="firstName" [ngModel]="contact.firstName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="!form.controls.firstName?.pristine && !form.controls.firstName?.valid">First name is required</div>

                <label>Last Name: </label><input name="lastName" [ngModel]="contact.lastName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="!form.controls.lastName?.pristine && !form.controls.lastName?.valid">Last name is required</div>

                <label>email: </label><input name="email" [ngModel]="contact.email" email><br/>
                <div class="alert alert-danger" role="alert" *ngIf="!form.controls.email?.valid">Email is invalid</div>

                <label></label><input type="submit" class="btn btn-danger" value="{{ !contact.id ? 'Add' : 'Save' }}" [disabled]="form.pristine || form.invalid"/>
                <a href="#" class="text-danger" (click)="showEdit = false">Cancel</a>
            </form>
        <div>
    `
})
export class ContactDetailsComponent implements OnInit {
    private contact: Contact
    private showEdit: boolean = false
    private sub: Subscription

    @ViewChild('form') form : NgForm

    constructor(
        private contactsService: ContactsService,
        private route: ActivatedRoute
    ) {}

    submit(form: NgForm) {
        if( ! form.valid ) return

        let dirtyContact: Contact = form.value

        dirtyContact.id = this.contact.id

        if(this.contact.id === null)
            this.contactsService.add( dirtyContact )
        else
            this.contactsService.update( dirtyContact )


        this.contact = dirtyContact
        this.showEdit = false
    }

    ngOnInit() {
       this.sub = this.route.params
            .map( params => {
                let id = + params['id']
                if( id<0 ) {
                    this.contact =  {id: null, firstName: '', lastName: '', email: ''}
                    this.showEdit = true
                } else {
                    this.showEdit = false
                }
                return id 
            })
            .filter( id => id >= 0 )
            .switchMap( id => this.contactsService.getById( id ) )
            .subscribe( contact => {
                this.contact = contact
            })
    }
}