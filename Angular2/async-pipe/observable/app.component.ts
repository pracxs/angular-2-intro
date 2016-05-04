import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        {{ message | async}} 
    `
})
export class AppComponent implements OnInit {
    message: Observable<string>;
    
    ngOnInit() {
        this.message = Observable.create( (observer) => {
            setTimeout( () => observer.next('Hi, I am observable message'), 2000 )   
        })
    }
 }
