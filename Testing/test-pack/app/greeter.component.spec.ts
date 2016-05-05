import {provide} from 'angular2/core'
import {describe,expect,it,xit, inject, beforeEach, beforeEachProviders, TestComponentBuilder, ComponentFixture, setBaseTestProviders} from 'angular2/testing'
import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser'
import {GreeterComponent} from './greeter.component'

describe('GreeterComponent', () => {
    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS)
    
    beforeEachProviders(() => [TestComponentBuilder])

    it('must be "Phone Book App"', 
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(GreeterComponent)
                .then((fixture: ComponentFixture) => {
                    let element = fixture.nativeElement

                    fixture.detectChanges()

                    expect(element.querySelectorAll('h1').length).toBe(1);
                    expect(element.querySelector('h1').innerText).toBe('Phone Book App');
                })
        })
    )   
})