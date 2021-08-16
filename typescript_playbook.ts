
//===============The Basics=====================
//---------------Static Type Checking-----------------

// Typescript is a tool that helps us find bugs before our code runs. 
// Static types systems like typescript describe he shapes and behaviours of what our values will
// be when we run our program


const message  = "hello";

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




