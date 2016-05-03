/* Decorator Factories */

function my(label: string) { // this is the decorator factory
    return function (target, propertyName: string, descriptor:any) { // this is the decorator
        console.log(label + ' -> ' + propertyName);
        console.log(descriptor);
        console.log(target);
        console.log('');
    }
}

function myClass(label: string) { // this is the decorator factory
    return function (target) { // this is the decorator
        console.log('The class');
        console.log(target);
        console.log('');
    }
}

function myProperty(label: string) { // this is the decorator factory
    return function (target, propertyName: string) { // this is the decorator
        console.log('The class');
        console.log(target);
        console.log('');
    }
}

@myClass('class:')
class Test {
    @myProperty('Property name:')
    name: string;
   
    constructor( @my('parameter') param: string ) {}
    
    @my('Method run:')
    run() {}
}