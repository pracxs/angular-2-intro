import {inject, fakeAsync, tick, TestComponentBuilder, ComponentFixture, setBaseTestProviders, getTestInjector} from '@angular/core/testing'
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing'
import {Component, Output, EventEmitter} from "@angular/core"
import {LogClicksDirective} from "./log-clicks.directive"

@Component({ 
  selector: 'container',
  template: `<div log-clicks (changes)="changed($event)"></div>`,
  directives: [LogClicksDirective]
})
export class TestContainer {  
  @Output() changes = new EventEmitter()
  
  changed(value){
    this.changes.emit(value)
  }
}

describe('LogClicksDirective (SYNC)', () => {
    if( !getTestInjector().platformProviders.length )
        setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS)
    
    it('should increment counter',
        fakeAsync ( inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            let fixture: ComponentFixture<TestContainer>
            
            tcb
                .createAsync(TestContainer)
                .then(rootFicture => fixture = rootFicture)
        
            // Create component-tick (initializes fixture variable)
            tick();
        
            let container = fixture.componentInstance
            let element = fixture.nativeElement
            let div = element.querySelector('div')

            let invocations = 1

            // subscribe
            container.changes.subscribe(x => { 
                expect(x).toBe(invocations)
            })
            
            //trigger click on container
            for(; invocations<=5; invocations++) {
                div.click()
                // let subscriber to execute
                tick()
            }
        }))
    )
}) 