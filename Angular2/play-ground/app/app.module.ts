/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent }  from './app.component'
import { MyUpperPipe }   from './my-upper.pipe'
import { ContactsService } from './contacts/contacts.service'
import { ContactsComponent } from './contacts/contacts.component'
import { ContactDetailsComponent } from './contacts/contact-details.component'
import { ContactsListComponent } from './contacts/contacts-list.component'
import { AboutComponent } from './about/about.component'
import { EmailValidator } from './email-validator.directive'

let routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes, { useHash: true }) ],
  declarations: [ AppComponent, MyUpperPipe, AboutComponent, ContactsComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator ],
  bootstrap:    [ AppComponent ],
  providers:    [ ContactsService ]
})
export class AppModule {}