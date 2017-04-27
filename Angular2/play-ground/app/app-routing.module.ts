import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'
import { FailComponent }            from "./fail/fail.component"

let routes: Routes = [
  { path: '',               redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**',             component: FailComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}