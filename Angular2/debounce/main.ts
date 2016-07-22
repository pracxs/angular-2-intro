/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {bootstrap}    from '@angular/platform-browser-dynamic'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { HTTP_PROVIDERS } from "@angular/http"

import {AppComponent} from './app.component'

bootstrap(AppComponent, [HTTP_PROVIDERS, disableDeprecatedForms(), provideForms()])
    .catch(err => console.error(err))