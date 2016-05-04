import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <input #box (keyup.enter)="values=box.value" (blur)="values=box.value">
        <p>{{values}}</p>
    `
})
export class AppComponent {
    values='';
}
