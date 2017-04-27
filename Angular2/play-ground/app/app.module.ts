/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }                 from '@angular/core'
import { BrowserModule }            from '@angular/platform-browser'
import { AppRoutingModule }         from './app-routing.module'
import { ContactsModule }           from './contacts/contacts.module';
import { AppComponent }             from './app.component'
import { AboutComponent }           from './about/about.component'
import { FailComponent }            from "./fail/fail.component"
import { DialogService }            from "./dialog.service"

@NgModule({
  imports:      [ BrowserModule,
                  ContactsModule,
                  AppRoutingModule ],
  declarations: [ AppComponent, 
                  AboutComponent,
                  FailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ DialogService ]
})
export class AppModule {}