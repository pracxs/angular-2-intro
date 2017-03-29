/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms'
import { HttpModule }     from '@angular/http'
import { AppComponent }   from './app.component'
import { ContactsComponent } from './contacts/contacts.component'
import { ContactsListComponent } from './contacts/contacts-list.component'
import { ContactDetailsComponent } from './contacts/contact-details.component'
import { MyUpperPipe }    from './my-upper.pipe'
import { EmailValidator } from './email-validator.directive'
import { AboutComponent } from './about/about.component'
import { AppRoutingModule } from "./app-routing.module"

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, AboutComponent, ContactsComponent, ContactDetailsComponent, ContactsListComponent, MyUpperPipe, EmailValidator ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}