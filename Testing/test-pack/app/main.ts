import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core'
import {ROUTER_PROVIDERS} from '@angular/router-deprecated'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'
import { HTTP_PROVIDERS }    from '@angular/http'
import {AppComponent} from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);