/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'

import { ContactsComponent }        from './contacts.component'
import { ContactDetailsComponent }  from './contact-details.component'

const routes: Routes = [
  { 
    path: 'contacts',       
    component: ContactsComponent,
    children: [
      { path: ':id', component: ContactDetailsComponent  },
    ] 
  }
]

@NgModule({
  imports:      [ RouterModule.forChild(routes) ],
  exports:      [ RouterModule ]
})
export class ContactsRoutingModule {}