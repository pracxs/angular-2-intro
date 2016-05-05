import {describe,expect,it,xit, inject, beforeEachProviders} from 'angular2/testing';
import {Person} from './person'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

describe('PersonService', () => {
    beforeEachProviders(() => [
            PersonService,
            LoadPersonsService
        ])
    
    it('must have 2 persons', inject([PersonService], (personService) => {
        let persons = personService.getAll();
        expect(persons.length).toBe(2)
    }))
    // it('1st person id should 1')
})