import {inject, addProviders} from '@angular/core/testing'
import {provide, Injector} from '@angular/core'
import {Http, Response} from '@angular/http'
import {MockBackend} from '@angular/http/testing'
import {BaseRequestOptions}    from '@angular/http'

import {LoadPersonsService} from "./load-persons.service"

const responseData = [
        { "id": "1", "firstName": "Max",     "lastName": "Smith",  "email": "max@gmail.com" },
        { "id": "2", "firstName": "Chris",   "lastName": "Raches", "email": "chris@gmail.com" }]

describe('MockBackend: LoadPersonsService', () => {
  let mockbackend: MockBackend, service: LoadPersonsService
  
  //setup
  beforeEach(() => {
    addProviders([
      LoadPersonsService,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend, options) => new Http(backend, options), 
        deps: [MockBackend, BaseRequestOptions]})
    ])
  })
  
  beforeEach(inject([MockBackend, LoadPersonsService], (_mockbackend, _service) => {
    mockbackend = _mockbackend
    service = _service
  }))
  
  //specs
  it('should return mocked response', done => {    
    // init connection
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<any>{body: JSON.stringify(responseData), status: 200}))
    })
    
    service.loadReal().subscribe(data => {
      expect(data.length).toBe(2)
      expect(data[0].firstName).toBe(responseData[0].firstName)
      done()
    })
  })
})