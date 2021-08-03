// ------------[1]Type by inference-----------
var helloWorld = "Hello World";
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    return UserAccount;
}());
// Using interfaces to annotate parameters and return values to functions
function getAdminUser() {
    var admin = new UserAccount("Alex", 1989);
    return admin;
}
function deleteUser(user) {
    user.name = "Alex";
    user.id = 1;
}
var user = new UserAccount("Murphy", 1);
// Unions provide ways to handle different types for example you can have a function that takes a string or an array
function getLength(obj) {
    return obj.length;
}
// Detrmining the type of a variable
var x;
typeof x === "string";
typeof x === "number";
typeof undefined === "undefined";
// Making a function return different values
function returnArrayOrString(obj) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}
// object is string
var object = backpack.get();
function logPoint(p) {
    console.log(p.x + ", " + p.y);
}
var point = { x: 12, y: 26 };
// logs "12", "13"
logPoint(point);
// The shape-matching only requires a subset of the object’s fields to match.
var point3 = { x: 12, y: 26, z: 89 };
// logs "12", "26"
logPoint(point3);
var rect = { x: 33, y: 3, width: 30, height: 80 };
// logs "33", "3"
logPoint(rect);
var color = { hex: '#187ABF' };
// logs error 
// logPoint(color);
// There is no difference between how classes and objects conform to shapes:
// If the object or class has all the required properties, 
// TypeScript will say they match, regardless of the implementation details.
var VirtualPoint = /** @class */ (function () {
    function VirtualPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return VirtualPoint;
}());
var newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint);
