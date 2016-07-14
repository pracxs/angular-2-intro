import {inject, addProviders, setBaseTestProviders, getTestInjector} from '@angular/core/testing'
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing'
import {provide} from "@angular/core"
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated"
import {Location} from '@angular/common'
import {SpyLocation} from "@angular/common/testing"
import {RootRouter} from "@angular/router-deprecated/src/router"
import {AppComponent} from "./app.component"

describe('Router tests', () => {
  if( !getTestInjector().platformProviders.length )
    setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS)
  
  let router: Router
  let spylocation: SpyLocation
  
  //setup
  beforeEach(() => {
    addProviders([
      RouteRegistry,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
      provide(Location, {useClass: SpyLocation}),
      provide(Router, {useClass: RootRouter}),
    ])
  })
  
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