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
import { AppComponent }             from './app.component'
import { MyUpperPipe }              from './my-upper.pipe'
import { ContactsService }          from './contacts.service'
import { ContactDetailsComponent }  from './contact-details.component'
import { ContactsListComponent }    from "./contacts-list.component"
import { EmailValidator }           from "./email-validator.directive"

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, 
                  ContactsListComponent, 
                  ContactDetailsComponent, 
                  MyUpperPipe,
                  EmailValidator ],
  bootstrap:    [ AppComponent ],
  providers:    [ ContactsService ]
})
export class AppModule {}