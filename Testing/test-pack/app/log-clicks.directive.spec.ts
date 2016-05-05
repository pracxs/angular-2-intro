import {describe, expect,it, xit, inject, beforeEach, beforeEachProviders, TestComponentBuilder, ComponentFixture} from 'angular2/testing'
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

describe('LogClicksDirective', () => {
    let fixture: ComponentFixture
  
    beforeEachProviders(() => [TestComponentBuilder])
  
    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb
            .createAsync(TestContainer)
            .then(f => fixture = f)
    }))
  
    it('should increment counter', done => {
        let container = fixture.componentInstance
        let element = fixture.nativeElement
        let div = element.querySelector('div')

        const expected = [1,2,3,4,5]
        let invocations = 0

        fixture.detectChanges()

        // subscribe
        container.changes.subscribe(x => { 
            expect(x).toBe(expected[invocations])
            
            invocations++
            if(invocations==expected.length)
                done()
        })
        
        //trigger click on container
        for(let ind of expected) {
            div.click()
        }
    })
}) 