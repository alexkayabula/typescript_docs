
//===============The Basics=====================
//---------------Static Type Checking-----------------

// Typescript is a tool that helps us find bugs before our code runs. 
// Static types systems like typescript describe he shapes and behaviours of what our values will
// be when we run our program


const message = "hello";

// Returns error
//message();

//---------------Non-exception Failures----------------

const user1 = {
    name: "Daniel",
    age: 26,
}

// user.location;

// The above code returns an error

// Typescript helps us catch legitimate errors like typos
const announcement = "Hello World";
// announcement.toLocaleLowercase();
announcement.toLocaleLowerCase()

//Typescript helps us catch uncalled functions
function flipCoin() {
    //Meant to be Math.random()
    // return Math.random < 0.5;
}


//------------------Explicit Types-----------------

function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()} !`)
}

//*****Type annotations never change the runtime behaviour of your program**********/

//------------------Downleveling-------------------
// By default targets ES3 but we can target a specific version of ecmascript 
// tsc --target es2015 hello.ts

//-----------------Strictness----------------------
// Enabling type checking strictness one can use --strict flag in cli or "strict": true in tsconfig.json
// Othe important strictness flags include noImplicitAny and strictNullChecks



//===============Everyday Types=====================

//---------------The primitives(string, number, boolean)-------------------

//---------------Arrays---------------------------------
// These can be represented as number[], string[], Array<number>, Array<string>

//---------------any--------------------------------------
// If a value is of type any, you can access any properties of it which can be any type.

let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

//---------------noImplicitAny------------------
// This is used o flag any implicit any as an error.

//----------------Types of annotations on variables------------

let myName: string = "Alice";

// No type annoation needed below due to typescript inference

let myName1 = "Alice"



//------------------Functions-----------------------

// Parameter type annotations
function greetme(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!")
}

// Return type annotations
function getFavoriteNumber(): number {
    return 25;
}

// Anonymous Functions

const names = ["Alice", "Bob", "Eve"];

names.forEach(function (s) {
    // Typescript will catch an error since it can determine how the function is being called
    // console.log(s.toUpperCase())
    console.log(s.toUpperCase())
});

names.forEach((s) => {
    // this is the same case with arrow functions
    // console.log(s.toUpperCase())
    console.log(s.toUpperCase())
})

// The process of Typescript using the types of the forEach function, 
// along with the inferred type of the array, to determine the type s will have is called 
// Contextual Typing
// This because the context that the function occurred within informs what type it should have.



//--------------------Object Types---------------------------

//parameters type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

//optional properties
// We use ? to define optional properties

function printName(obj: { first: string; last?: string }) {
    console.log("The coordinate's x value is " + obj.first);
    console.log("The coordinate's y value is " + obj.last);
}

printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// It is important to check for undefined when reading from an optional property

function printName2(obj: { first: string; last?: string }) {
    //App might crash if last wasn't provided so we check for undefined
    if (obj.last !== undefined) {
        console.log(obj.last.toUpperCase());
    }
    // Safe alternative
    console.log(obj.last?.toUpperCase());
}



//--------------------Union Types---------------------------
// A union type is a type formed from two or more types
// Each member being defined as a union member

// Below is function that operates on numbers or strings

function printId(id: number | string) {
    console.log("Your ID is " + id); 
}

printId(101);  //ok
printId("202"); //ok
printId({myID: 22378}); //returns an error

// Working with Union Types

// TypeScript will only allow you to do things with the union if that thing is valid for every member of the union.
// For example, if you have the union string | number , you can't use methods that are only available on string :

function printId1(id: number | string) {
    //This will return an error
    console.log(id.toUpperCase());
}

// We can solve the challenge above by narrowing the union.
// Narrowing occurs when TypeScript can deduce a more specific type 
// for a value based on the structure of the code.

function printId2 (id: number | string) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

// Another example.
function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log("Hello, " + x.join(" and "));
    } else {
        console.log("Welcome lone traveler " + x);
    }
}

// If every member in a union has a property in common,
// you can use that property without narrowing:
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}

//-----------------------Type Aliases----------------
// A type alias is exactly that - a name for any type.

type Point1 = {
    x: number;
    y: number;
}

function printCoord1(pt: Point1) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord1({x: 100, y: 100});

// Another example of a type alias
type ID = number | string;

type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
    return sanitize(str);
}

let userInput = sanitizeInput(getInput());

userInput = "new input";


//-----------------------Interfaces----------------

interface Point {
    x: number;
    y: number;
}

function printCoord2(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

// Typescript is only concerned about the structure and capabilities 
// of types that is why it is called a structurally typed system.

// Type aliases and interfaces are similar but the only distinction is that 
// interfaces can be extended while types cannot.


//-------------------Type Assertions-----------------

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

//-------------------Literal Types------------------

let changingString = "Hello World";
changingString = "Ola Mundo";
changingString;

const constantString = "Hello World";
constantString;

// But by combining literals into unions, 
// you can express a much more useful concept - for example, 
// functions that only accept a certain set of known values:

function printText(s: string, alignment: "left" | "right" | "center") {
    //...
}

printText("Hello, world", "left");
printText("G'day, mate", "centre"); // returns error

// Another example of numerical literal
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

// Combining with non-literals
interface Options {
    width: number;
}

function configure(x: Options | "auto") {
    //...
}

configure({width: 100});
configure("auto");
configure("automatic"); // Error

//-------------------Literal Inference------------------

// When you initialize a variable with an object, 
// TypeScript assumes that the properties of that object might change values later.

const obj1 = { counter: 0};
if(obj1) {
    obj1.counter = 1;
}

//obj1.counter should have type number

// this applies to also strings
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

// The above code returns error
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
// Because code can be evaluated between the creation of req and the call of handleRequest which could assign a new string like "GUESS" to req.method, 
// TypeScript considers this code to have an error.

// Fix 1
// You can change the inference by adding a type assertion in either location:
const req1 = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req.url, req.method as "GET");

// Change 1 means "I intend for req.method to always have the literal type "GET", 
// preventing the possible assignment of "GUESS" to that field after. Change 2 means 
// "I know for other reasons that req.method has the value "GET".

// Fix 2
const req2 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);

// The as const suffix acts like const but for the type system,
// ensuring that all properties are assigned the literal type 
// instead of a more general version like string or number.


//--------------------null and undefined----------------
// These represent uninitialized values

// strictNullChecks off
// values that might be null or undefined can still be accessed
// normally and null and undefined can be assigned to a property
// of any type.

// strictNullChecks on
// when a value is null or undefined, you will need to test
// for those values before using methods or properties on that value.

function doSomething(x: string | null) {
    if (x === null) {
        console.log("It is null");
    } else {
        console.log("Hello, " + x.toUpperCase());
    }
}

//----------------Non-null Assertion Operator (Postfix!)
// This removes null and undefined from a type without explicit checking

function liveDangerously (x?: number | null) {
    // No error
    console.log(x!.toFixed())
}

// This function may not take in any paramenters
liveDangerously()

//-------------------------------Enums---------------------------------
// Allow describing a value which could be a set of possible constants.

//--------------------Less Common Primitives----------------

// ES2020
// bigint
// Used for very large integers

const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 100n;

// symbol
// primitive to create a globally unique reference via function Symbol()

const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
    // This will always return false
}
