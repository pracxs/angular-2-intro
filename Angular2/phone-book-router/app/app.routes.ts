/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
 
import { provideRouter, RouterConfig } from '@angular/router'
import { CanDeactivateGuard }    from './can-deactivate-guard'
import { ContactsRoutes } from "./contacts/contacts.routes"
import { AboutRoutes } from "./about/about.routes"

export const routes: RouterConfig = [
  ...ContactsRoutes,
  ...AboutRoutes,
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'partial'
  },
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  CanDeactivateGuard
]