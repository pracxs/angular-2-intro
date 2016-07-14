/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {bootstrap}    from '@angular/platform-browser-dynamic';

import { disableDeprecatedForms, provideForms } from '@angular/forms'

import {provide} from '@angular/core'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'

import {AppComponent} from './app.component'
import { APP_ROUTER_PROVIDERS } from './app.routes'


// bootstrap(AppComponent, [APP_ROUTER_PROVIDERS]);
bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(), APP_ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})])
    .catch(err => console.error(err))