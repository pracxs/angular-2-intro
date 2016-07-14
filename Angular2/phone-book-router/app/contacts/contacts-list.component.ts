/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="let person of persons" class="item" [class.active]="selected==person.id">
                <a (click)="onSelect(person)">{{person.firstName}} {{person.lastName | uppercase}}</a>
                <a (click)="remove(person)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit, OnDestroy {
    selected: number
    persons: Contact[]
    private sub: Subscription
    
    constructor(
        private personService: ContactsService, 
        private router: Router,
        private route: ActivatedRoute
    ) {}
    
    remove(person: Contact) {    
        this.personService.remove(person.id)
        if(person.id==this.selected )
            this.router.navigate(['/'])
    }
    
    onSelect(person: Contact) {
        this.router.navigate(['/', person.id])
    }
    
    ngOnInit() {
        this.persons = this.personService.getAll();
        
        let oldChildRoute

        let atachChildParamListner = () => {
            let childRoute: ActivatedRoute = this.router.routerState.children(this.route)[0]

            if(oldChildRoute!=childRoute) {
                oldChildRoute = childRoute

                if(this.sub)
                    this.sub.unsubscribe()

                this.sub = childRoute.params.subscribe(params => {
                    if( params['id']!=='' && + params['id'] > 0)
                        this.selected = +params['id']
                    else
                        this.selected = null;
                })
            }
        }

        this.router.events.subscribe(event=> {
            if( ! ( event instanceof NavigationEnd ) ) return

            atachChildParamListner()
        })

        atachChildParamListner()
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
 }
