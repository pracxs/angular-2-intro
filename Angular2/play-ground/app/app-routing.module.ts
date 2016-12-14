import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent }       from './about/about.component'
import { ContactDetailsComponent } from './contacts/contact-details.component'

let routes: Routes = [
  { path: 'contacts', loadChildren: 'app/contacts/contacts.module#ContactsModule' },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: '**', component: AboutComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}