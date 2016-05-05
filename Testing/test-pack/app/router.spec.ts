import {describe, expect,it, xit, inject, beforeEach, beforeEachProviders, setBaseTestProviders} from 'angular2/testing'
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser'
import {provide, Component} from "angular2/core"
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT} from "angular2/router"
import {Location} from 'angular2/platform/common'
import {SpyLocation} from "angular2/src/mock/location_mock"
import {RootRouter} from "angular2/src/router/router"
import {AppComponent} from "./app.component"

describe('Router tests', () => {
  //setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS)
  
  let router: Router
  let spylocation: SpyLocation
  
  //setup
  beforeEachProviders(() => [
    TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS,
    RouteRegistry,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(Location, {useClass: SpyLocation}),
    provide(Router, {useClass: RootRouter}),
  ])
  
  beforeEach(inject([Router, Location], (r, l) => {
    router = r
    spylocation = l
  }))
  
  //specs
  it('Should be able to navigate to Home', done => {
    router.navigate(['PersonList']).then(() => {
      expect(spylocation.path()).toBe('')
      done()
    }).catch(e => done.fail(e))
  })

  it('should redirect not registered urls to Home', done => {
    router.navigateByUrl('/unknown').then(() => {
      expect(spylocation.path()).toBe('')
      done()
    }).catch(e => done.fail(e))
  })
  
  it('Should be able to navigate to About', done => {    
    router.navigate(['About']).then(() => {
      expect(spylocation.path()).toBe('/about')
      done()
    }).catch(e => done.fail(e))
  })
})