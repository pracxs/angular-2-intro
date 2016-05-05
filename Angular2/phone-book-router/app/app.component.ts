import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ContactsListComponent} from "./contacts-list.component"
import {ContactDetailsComponent} from "./contact-details.component"
import {ContactsService} from "./contact.service"
import {Person} from "./person"

@Component({
    selector: 'my-app',
    template: `
        <contacts-list></contacts-list>
        
        <a id="add" class="text-danger" [routerLink]="['PersonDetail', {id: -1}]"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <router-outlet></router-outlet>
    `,
    directives: [ContactsListComponent, ROUTER_DIRECTIVES],
    providers: [ContactsService]
})
@RouteConfig([
  {path:'/:id', name: 'PersonDetail', component: ContactDetailsComponent, useAsDefault: true}
])
export class AppComponent {}