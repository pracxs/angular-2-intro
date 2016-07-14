import {provide} from '@angular/core'
import {inject, addProviders} from '@angular/core/testing'
import {Person} from './person'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

describe('PersonService', () => {
    class LoadPersonsServiceMock {
        load (): Person[] {
            return [
                { "id": 1, "firstName": "Max",     "lastName": "Smith",  "email": "max@gmail.com" },
                { "id": 4, "firstName": "John",    "lastName": "Doe",    "email": "john@gmail.com" }
            ]
        }
    }
    
    beforeEach(() => {
        addProviders([
            PersonService,
            provide(LoadPersonsService,{useClass: LoadPersonsServiceMock})
        ])
    })
    
    it('must have 2 persons', inject([PersonService], (personService) => {
        let persons = personService.getAll();
        expect(persons.length).toBe(2)
    }))
    
    it('1st person id should 1', inject([PersonService], (personService) => {
        let persons = personService.getAll();
        expect(persons[0].id).toBe(1)
    }))
})