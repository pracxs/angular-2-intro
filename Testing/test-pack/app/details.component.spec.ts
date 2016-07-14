import {provide} from '@angular/core'
import {inject, async, addProviders, setBaseTestProviders, getTestInjector, TestComponentBuilder, ComponentFixture} from '@angular/core/testing'
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing'
import {Http} from '@angular/http'
import {PersonsDetailsComponent} from './details.component'

describe('PersonsDetailsComponent', () => {
    if( !getTestInjector().platformProviders.length )
        setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS)
    
    let fixture: ComponentFixture<PersonsDetailsComponent>
    
    beforeEach( () => {
        addProviders([
            provide(Http, {useValue: {}})
        ])
    })

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(PersonsDetailsComponent)
                .then(rootFixture => fixture = rootFixture )
        })
    ))
    
    it('must be a list of persons list', () => {
        let component = fixture.componentInstance
        let element = fixture.nativeElement
        
        fixture.detectChanges()
        
        expect(element.querySelectorAll('li').length).toBe(5)
        expect(element.querySelector('li').innerText).toBe('Max Smith')
    })
})