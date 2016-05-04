import {Component, OnInit} from 'angular2/core';
import {Control} from 'angular2/common';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'my-app',
    template: `
        <input type=text [value]="firstName" [ngFormControl]="firstNameControl"><br/>
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
