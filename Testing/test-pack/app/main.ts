import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HashLocationStrategy, LocationStrategy} from 'angular2/platform/common'
import { HTTP_PROVIDERS }    from 'angular2/http'
import {AppComponent} from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);