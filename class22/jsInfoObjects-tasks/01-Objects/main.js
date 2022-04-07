//Hello, object
//importance: 5
//Write the code, one line for each action:
//
//    Create an empty object user.
//    Add the property name with the value John.
//    Add the property surname with the value Smith.
//    Change the value of the name to Pete.
//    Remove the property name from the object.

const user = {};
user.name = `john`;
user.surname = `smith`;
console.log(user);
user.name = `pete`;
console.log(user);
delete user.name;
console.log(user);

//------------------------------------------------------------------------

//Check for emptiness
//importance: 5
//
//Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.
//
//Should work like that:
function isEmpty(object) {
  for (let prop in object) {
    return false;
  }
  return true;
}

let schedule = {};

alert(isEmpty(schedule)); // true

schedule["8:30"] = "get up";

alert(isEmpty(schedule)); // false

//------------------------------------------------------------------------

//Sum object properties
//importance: 5
//
//We have an object storing salaries of our team:

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

//Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.
//
//If salaries is empty, then the result must be 0.

let sum = 0;

for (let prop in salaries) {
  sum += salaries[prop];
}

console.log(sum);

//------------------------------------------------------------------------

//Multiply numeric property values by 2
//importance: 3
//
//Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.
//
//For instance:

// before the call
//let menu = {
//  width: 200,
//  height: 300,
//  title: "My menu"
//};
//
//multiplyNumeric(menu);
//
//// after the call
//menu = {
//  width: 400,
//  height: 600,
//  title: "My menu"
//};

//Please note that multiplyNumeric does not need to return anything. It should modify the object in-place.
//
//P.S. Use typeof to check for a number here.
function multiplyNumeric(obj) {
  for (let prop of obj) {
    if (typeof obj[prop] === `number`) {
      obj[prop] *= 2;
    }
  }
}

let menu = {
  width: 200,
  height: 300,
  title: "My menu",
};
console.log(menu);
multiplyNumeric(menu);
console.log(menu);
