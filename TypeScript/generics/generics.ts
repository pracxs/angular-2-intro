function identity<T>(arg: T): T {
    return arg;
}

// -- Working with Generic Type Variables --

function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

function loggingIdentity2<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

// -- Generic Types --

let myIdentity: <T>(arg: T) => T = identity;
let myIdentity2: <U>(arg: U) => U = identity;
let myIdentity3: {<T>(arg: T): T} = identity; //  call signature of an object

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity4<T>(arg: T): T {
    return arg;
}

let myIdentity4: GenericIdentityFn<number> = identity;

// -- Generic Classes --

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// -- Generic Constraints --

interface Lengthwise {
    length: number;
}

function loggingIdentity5<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

// -- Using Type Parameters in Generic Constraints --

function find<T, U extends Findable<T>>(n: T, s: U) {   // errors because type parameter used in constraint
// ...
}
find (giraffe, myAnimals);

// works

function find<T>(n: T, s: Findable<T>) {
  // ...
}
find(giraffe, myAnimals);

// -- Using Class Types in Generics --

function create<T>(c: {new(): T; }): T {
    return new c();
}