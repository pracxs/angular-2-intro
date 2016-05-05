import {Component} from 'angular2/core';
import {MyUpperPipe} from './my-upper.pipe'

@Component({
    selector: 'my-app',
    template: `
        {{firstName | myUpper}}
    `,
    pipes: [MyUpperPipe]
})
export class AppComponent {
    firstName = 'Todor'
 }
