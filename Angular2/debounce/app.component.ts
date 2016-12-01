import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime'

@Component({
    selector: 'my-app',
    template: `
        <input type=text [value]="firstName" [formControl]="firstNameControl"><br/>
        {{firstName}}
    `
})
export class AppComponent implements OnInit {
    firstName = ''
    firstNameControl: FormControl
    
    constructor() { 
        this.firstNameControl = new FormControl();
    }
    
    ngOnInit() {
        this.firstNameControl.valueChanges
            .debounceTime(1000)
            .subscribe(newValue => this.firstName = <string> newValue)
    }
 }
