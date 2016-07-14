import {inject, addProviders} from '@angular/core/testing'
import {Counter} from "./counter.component"

describe('EventEmitter: Counter', () => {
  
  //setup
  beforeEach(() => {
    addProviders([Counter])
  })
  
  beforeEach(inject([Counter], c => {
    this.counter = c
  }))
  
  //specs
  it('should increment +1', done => {
    this.counter.changes.subscribe(x => { 
      expect(x).toBe(1)
      done()
    })
    this.counter.change(1)
  })

  it('should decrement -1', done => {
    this.counter.changes.subscribe(x => { 
      expect(x).toBe(-1)
      done()
    })
    this.counter.change(-1)
  })  
}) 