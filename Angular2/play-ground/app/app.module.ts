/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }                 from '@angular/core'
import { FormsModule }              from '@angular/forms'
import { BrowserModule }            from '@angular/platform-browser'
import { AppRoutingModule }         from './app-routing.module'
import { AppComponent }             from './app.component'
import { MyUpperPipe }              from './my-upper.pipe'
import { ContactsComponent }        from './contacts/contacts.component'
import { ContactsService }          from './contacts/contacts.service'
import { ContactDetailsComponent }  from './contacts/contact-details.component'
import { ContactsListComponent }    from "./contacts/contacts-list.component"
import { EmailValidator }           from "./email-validator.directive"
import { AboutComponent }           from './about/about.component'
import { FailComponent }            from "./fail/fail.component"
import { DialogService }            from "./dialog.service"

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule ],
  declarations: [ AppComponent, 
                  ContactsComponent,
                  ContactsListComponent, 
                  ContactDetailsComponent, 
                  MyUpperPipe,
                  EmailValidator,
                  AboutComponent,
                  FailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ ContactsService,
                  DialogService ]
})
export class AppModule {}