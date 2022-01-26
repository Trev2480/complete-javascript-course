'use strict';

//Coding Challenge #2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  //This second part works because when the function is executed the one time, the header variable is available to the Event Listener through a Closure, because the IIFE has already been executed and the "header" variable itself is GONE. the event listener is STILL able to access the header var through the Closure.
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

///////////////////////////////////////

/*
//CLOSURES

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker(); //how is it updating passengerCount? Shouldn't it reset?
console.dir(booker); //can see the variable environment under the SCopes property

//a closure makes that happen, makes the function "remember"
//a function has access to the Variable Environment of the execution context in which it was created attached to the fn, exactly as it was at the time and place the function was created
// A closure is the closed-over VE of the EC in which a function was created even after that EC is gone
//Gives a fn access to all the var of its parent fn, even after that parent fn has returned. The fn keeps a ref to its outer scope, which preserves the scope chain throughout time.
//This is a manual process, you cannot explicitly access closed-over var, Closures are not tangible JS Objects.

//Closure examples

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();

//Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds.`);
};

boardPassengers(180, 3);



//Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
//cannot run without a keyword; can bypass by wrapping in parenthesis
//IIFE
(function () {
  console.log('This will never run again: part 2');
})();
//Another IIFE (arrow function)
(() => console.log('Also not gonna run again'))();

//Doesn't seem to be used too much to create a scope as in ES6 can use block scope like this

{
  const isPrivate = 23;

}
console.log(isPrivate); //will cause an error


const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}(Write option number)`
      )
    );
    //Register answer
    //typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
    console.log(typeof answer, answer);
    if (answer >= 0 && answer < this.answers.length) {
      this.answers[answer] += 1;
      console.log(`Added to the array`);
    } else {
      console.log(`Please try again with a different number`);
    }
    //call the displayResults
    this.displayResults.call(poll, prompt(`Array or String?`));
  },
  displayResults(type = 'array') {
    type = type.toLowerCase();
    if (type == 'string') {
      console.log(typeof type, type);
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else if (type == 'array') {
      console.log(typeof type, type);
      console.log(this.answers);
    } else {
      console.log(typeof type, type);
      console.log(`Pick another type`);
    }
  },
};
//Displays the poll results as a string or an array

const pollBtn = document.querySelector('.poll');
pollBtn.addEventListener('click', poll.registerNewAnswer.bind(poll));

//Bonus
const test1 = [5, 2, 3];
const test2 = [1, 5, 3, 9, 6, 1];

//String Display
poll.displayResults.call({ answers: test1 }, 'string');
poll.displayResults.call({ answers: test2 }, 'string');

//Array Display
poll.displayResults.call({ answers: test1 }, 'array');
poll.displayResults.call({ answers: test2 });


const luft = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

luft.book(248, 'Trevin');
luft.book(657, 'Smith');
luft.book(248, 'Anderson');

const euro = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

//Call method
const book = luft.book;
//how to tell which object to apply the general book function to? use the CALL function
//this CALL function will manually manipulate the "this." keyword to point to the function that you want to.
//book(23, 'Sarah'); //this. returns undefined

book.call(euro, 23, 'Sarah');
console.log(euro);

book.call(luft, 25, 'Josh');
console.log(luft);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 5834, 'Mary');
console.log(swiss);

//Apply method (uses an array as the second argument. )
const flightData = [583, 'George'];
book.apply(swiss, flightData); //not largely used bc use call with the "spread" operator
console.log(swiss);
//same as apply method.
book.call(swiss, ...flightData);

//bind method
//book.call(euro, 23, 'Sarah');
//creates a function with the "this" keyword bound to whatever you pass in
const bookE = book.bind(euro);

bookE(23, 'Steven');

//can also use bind to preset args
const bookE23 = book.bind(euro, 23); //always will pass 23 as the flight number. Now when you call it, only need the name
bookE23('Marthaaaaaaaa');
console.log(euro);

//with Event Listeners
luft.planes = 300;
luft.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', luft.buyPlane.bind(luft)); //cannot use call as it calls the function, have to use bind as it creates/return a new function
//Partial application

const addTax = (tax, value) => value + value * tax;
console.log(addTax(0.1, 200));

//null is indicating what the "this" keyword is pointing to. Not in the original function so doesn't matter
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));
console.log(addVAT(50));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(50));

 const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}; 

//rewrite above with only arrow functions
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('hey');
greeterHey('Trevin');
greeterHey('Alice');

//Closure is why this function works

//Can also call the function all together
greet('Hello')('Trevin');
*/
