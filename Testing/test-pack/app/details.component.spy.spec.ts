import {inject, async, TestComponentBuilder, ComponentFixture, setBaseTestProviders, getTestInjector} from '@angular/core/testing'
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing'
import {provide} from '@angular/core'
import {PersonsDetailsComponent} from './details.component'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

describe('PersonsDetailsComponent (SPY)', () => {
    if( !getTestInjector().platformProviders.length )
        setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS)
    
    let fixture: ComponentFixture<PersonsDetailsComponent>
    
    class PersonServiceMock {
        getAll() {
            return [
                  { "id": 1, "firstName": "Max",     "lastName": "Smith",  "email": "max@gmail.com" },
                  { "id": 2, "firstName": "Chris",   "lastName": "Raches", "email": "chris@gmail.com" }]
        }
    }
    
    let personServiceSpy = new PersonServiceMock()
    
    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        spyOn(personServiceSpy, 'getAll').and.callThrough()
        
        return tcb
            .overrideProviders(
                PersonsDetailsComponent
                ,
                [provide(PersonService, {useValue: personServiceSpy}),
                 provide(LoadPersonsService, {useValue: {}})]
            )
            .createAsync(PersonsDetailsComponent)
            .then(rootFixture => fixture = rootFixture)
    })))
    
    it('must be a list of persons list', () => {
        let component = fixture.componentInstance
        let element = fixture.nativeElement
        
        fixture.detectChanges()
        
        expect((<any>personServiceSpy.getAll).calls.count()).toBe(1)
        
        expect(element.querySelectorAll('li').length).toBe(2)
        expect(element.querySelector('li').innerText).toBe('Max Smith')
    })
})