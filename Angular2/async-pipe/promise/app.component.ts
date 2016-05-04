import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        {{ message | async}} 
    `
})
export class AppComponent implements OnInit {
    message: Promise<string>;
    
    ngOnInit() {
        this.message = new Promise( (resolve) => {
            setTimeout(() => resolve('Hi, I am promise message'), 2000 )   
        })
    }
 }
