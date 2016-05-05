import {provide} from 'angular2/core'
import {describe,expect,it,xit, inject, beforeEach, beforeEachProviders, TestComponentBuilder, ComponentFixture, setBaseTestProviders} from 'angular2/testing'
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser'
import {Http} from 'angular2/http'
import {PersonsDetailsComponent} from './details.component'

describe('PersonsDetailsComponent', () => {
    setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS)
    
    let fixture: ComponentFixture
    
    beforeEachProviders(() => [
        TestComponentBuilder,
        provide(Http, {useValue: {}})
    ])
    
    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb
            .createAsync(PersonsDetailsComponent)
            .then(rootFixture => fixture = rootFixture)
    }))
    
    it('must be a list of persons list', () => {
        let component = fixture.componentInstance
        let element = fixture.nativeElement
        
        fixture.detectChanges()
        
        expect(element.querySelectorAll('li').length).toBe(5)
        expect(element.querySelector('li').innerText).toBe('Max Smith')
    })
})