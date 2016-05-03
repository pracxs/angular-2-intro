// -- Var scoping rules and quirks --

function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

document.write( '' + f(true) + '<br/>' );  // returns '10'
document.write( '' + f(false) ); // returns 'undefined'

// in nested loops

function printMatrix() {
    for (var i = 0; i < 5; i++) {
        for (var i = 0; i < 5; i++) {
            document.write( i + ' ' )
        }
        document.write( '<br/>' )
    }
}
printMatrix()

// -- Variable capturing quirks --

for (var i = 0; i < 10; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}


// -- Block/Lexical scoping ---
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}

// Error: 'e' doesn't exist here
console.log(e);

// --

function foo() {
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo();

let a;


// -- Const --

const numLivesForCat = 9;
numLivesForCat = 10; // displays error but value is still changed
