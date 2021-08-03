// ------------[1]Type by inference-----------

let helloWorld = "Hello World"

// -------------[2]Defining Types---------------

// Object with inferred type
// const user = {
//     name: "Hayes",
//     id: 0
// }

// Describe the objects shape using interface declaration
interface User {
    name: string;
    id: number;
}

// Let object user conform to the new interface by using syntax : TypeName after variable declaration
// const user: User = {
//     name: "Hayes",
//     id: 0
// }

interface User {
    name: string;
    id: number;
}

class UserAccount {
    name: string;
    id: number

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id
    }
}

// Using interfaces to annotate parameters and return values to functions
function getAdminUser(): User {
    let admin: User = new UserAccount("Alex", 1989)
    return admin;
}

function deleteUser(user: User) {
    user.name = "Alex";
    user.id = 1
}

const user : User = new UserAccount("Murphy", 1)

// Javascipt primitive types that can be used in an interface
// string, number, boolean, symbol, undefined, bignit, null
// Typesript extends the list to include
// any, unknown, never 

// --------------[3]Composing Types----------------
// Create complex types by combining simple ones using Unions and Generics

// Unions 
// You can declare a type that could be one of many types

type MyBool = true | false;

// Popular use case is a set of string or number literals that a value is allowed to be

type WindowStates = "open" | "closed" | "minimized";
type LockedStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

// Unions provide ways to handle different types for example you can have a function that takes a string or an array

function getLength(obj: string | string[]) {
    return obj.length
}

// Detrmining the type of a variable
let x;
typeof x === "string";
typeof x === "number";
typeof undefined === "undefined"

// Making a function return different values

function returnArrayOrString(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}

// Generics
// Generics provide variables to types.
// A common example is an array. An array without generics could contain anything.
// An array with generics can describe the values that the array contains.

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{name: string}>;

// Declaring own types that use generics

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

// declare a constant
declare const backpack: Backpack<string>;

// object is string
const object = backpack.get();

// cannot pass a number since backpack variable is a string
// backpack.add(23);


// -----------------[4] Structural Type System-----------------
// Structural typing or duck typing means that if two objects have the same shape, they are considerd to be of the same type

interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = {x: 12, y: 26};

// logs "12", "13"
logPoint(point);

// The shape-matching only requires a subset of the object’s fields to match.

const point3 = {x: 12, y: 26, z: 89};

// logs "12", "26"
logPoint(point3);

const rect = { x: 33, y: 3, width: 30, height: 80};

// logs "33", "3"
logPoint(rect);

const color = { hex: '#187ABF'};

// logs error 
// logPoint(color);

// There is no difference between how classes and objects conform to shapes:
// If the object or class has all the required properties, 
// TypeScript will say they match, regardless of the implementation details.

class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }
}

const newVPoint = new VirtualPoint(13, 56);

// logs "13", "56"
logPoint(newVPoint);
