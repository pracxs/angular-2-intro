import {Component} from '@angular/core'
import {RouteConfig, RouterOutlet, RouterLink} from '@angular/router-deprecated'
import {PersonsDetailsComponent} from './details.component'
import {GreeterComponent} from './greeter.component'
import {AboutComponent} from './about.component'

@Component({
    selector: 'my-app',
    template: `
        <greet></greet>
        <router-outlet></router-outlet>
        <a [routerLink]="['PersonList']">List</a> | <a [routerLink]="['About']">About</a>
    `,
    directives: [GreeterComponent, RouterOutlet, RouterLink]
})
@RouteConfig([
  {path: '/',       name: 'PersonList', component: PersonsDetailsComponent, useAsDefault: true},
  {path: '/about',  name: 'About',      component: AboutComponent},
  {path: '/**',     redirectTo: ['PersonList'] }
])
export class AppComponent {}