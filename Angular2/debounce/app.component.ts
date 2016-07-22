import { Component, OnInit } from '@angular/core'
import { Control } from '@angular/common'
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
import 'rxjs/add/operator/debounceTime'

@Component({
    selector: 'my-app',
    directives: [REACTIVE_FORM_DIRECTIVES],
    template: `
        <input type=text [value]="firstName" [formControl]="firstNameControl"><br/>
        {{firstName}}
    `
})
export class AppComponent implements OnInit {
    firstName = ''
    firstNameControl: Control
    
    constructor() { 
        this.firstNameControl = new Control();
    }
    
    ngOnInit() {
        this.firstNameControl.valueChanges
            .debounceTime(1000)
            .subscribe(newValue => this.firstName = <string> newValue)
    }
 }
