import {inject, async, TestComponentBuilder, ComponentFixture, addProviders, setBaseTestProviders, getTestInjector} from '@angular/core/testing'
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing'
import {provide} from "@angular/core"
import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated"
import {Location} from '@angular/common'
import {SpyLocation} from "@angular/common/testing"
import {RootRouter} from "@angular/router-deprecated/src/router"
import {Http} from '@angular/http'
import {AppComponent} from "./app.component"

const responseData = [
        { "id": "1", "firstName": "Max",     "lastName": "Smith",  "email": "max@gmail.com" },
        { "id": "2", "firstName": "Chris",   "lastName": "Raches", "email": "chris@gmail.com" }]

describe('Router & App tests', () => {
  if( !getTestInjector().platformProviders.length )
    setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS)
  
  let router: Router
  let spylocation: SpyLocation
  let fixture: ComponentFixture<AppComponent>
  
  //setup
  beforeEach(() => {
    addProviders([
      RouteRegistry,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
      provide(Location, {useClass: SpyLocation}),
      provide(Router, {useClass: RootRouter}),
      provide(Http, {useValue: {} }),
    ])
  })
  
  beforeEach(done => { 
    inject([Router, Location, TestComponentBuilder], (r, l, tcb: TestComponentBuilder) => {
      router = r
      spylocation = l
      
      return tcb
              .createAsync(AppComponent)
              .then(rootFixture => {
                    fixture = rootFixture
                    done()
                  })
    })()
  })
  
  //specs
  
  it('Selecting person from the list should set correct URL', done => {
    let element: HTMLElement = fixture.nativeElement
    
    fixture.detectChanges()
    
    let links = <NodeListOf<HTMLLinkElement>> element.querySelectorAll('a')
    links.item(1).click()
    
    fixture.detectChanges()
    
    setTimeout(() => {
      // console.log(element.innerHTML)
      expect(spylocation.path()).toBe('/about')
      done()
    })
  })
})