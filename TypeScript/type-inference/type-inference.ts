// -- Basics --

let x1 = 3;

// -- Best common type --

let x2 = [0, 1, null];

{
    class Animal {}
    class Rhino extends Animal {}
    class Elephant extends Animal {}
    class Snake extends Animal {}

    // no best common type
    let zoo1 = [new Rhino(), new Elephant(), new Snake()];
    
    // solution
    let zoo2: Animal[] = [new Rhino(), new Elephant(), new Snake()];
}

// -- Contextual Type --

window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.buton);  //<- Error
};