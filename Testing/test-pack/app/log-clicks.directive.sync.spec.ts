import {describe, expect,it, xit, inject, beforeEach, beforeEachProviders, TestComponentBuilder, ComponentFixture, fakeAsync, tick} from 'angular2/testing'
import {Component, Output, EventEmitter} from "angular2/core"
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
  
    beforeEachProviders(() => [TestComponentBuilder])
  
    it('should increment counter',
        inject([TestComponentBuilder], fakeAsync ( (tcb: TestComponentBuilder) => {
            let fixture: ComponentFixture
            
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