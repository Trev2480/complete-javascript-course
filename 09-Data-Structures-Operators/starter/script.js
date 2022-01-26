'use strict';

// Working with Strings
const airline = 'TAP Air Portugal';
//const plane = 'A320';

/* console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7)); //End value not included in the string.

//Extract first word
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1)); */

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log('You got the middle seat')
    : console.log('You got lucky');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

const passenger = 'TreViN';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(normalizedEmail === email);

//replacing parts of Strings
const priceGB = '288,97E';
const priceUS = priceGB.replace(',', '.').replace('E', '$');
console.log(priceUS);

const ann = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(ann.replace('door', 'gate'));

//console.log(ann.replaceAll('door', 'gate'));
console.log(ann.replace(/door/g, 'gate'));

const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the New Airbus family');
}

//Practice Exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome Aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    //namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
};

//Padding
const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(25, '+').padEnd(30, '+'));

const maskedCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskedCreditCard(34811212838481936));

//const flights = ('_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30');

//////////////////////////////////////////////

/*
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu.starterIndex} and ${this.mainMenu.mainIndex} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing}, ${ing3}!`);
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// MAPS
//Objects: keys are always strings, maps, keys can be any type
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try Again'],
]);
console.log(question);

//Convert object to map
//console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
//console.log(hoursMap);
/* for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
} 
let answer = 3;

console.log(
  question.get('correct') === answer ? question.get(true) : question.get(false)
);

//const answer = Number(prompt('Your answer'));
// MAPS
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
rest.get(time > rest.get('open') && time < rest.get('close'));

console.log(rest.has('categories'));
rest.delete(2);
//rest.clear();

const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));

//Sets
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Trevin'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
///ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; //Makes a set then converts back to an array
console.log(staffUnique);
console.log(new Set(staff).size);

//Property Names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//Property VALUES
const values = Object.values(openingHours);
console.log(values);

//Entire objects
const entries = Object.entries(openingHours);
//console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//Optional Chaining.
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//WITH Optional Chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

//Example
const days = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we are open at ${open}`);
}

//Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//Arrays
const users = [{ name: 'Jonas', email: 'Heloo@ja.com' }];
console.log(users[0]?.name ?? 'User array empty');
//better than
if (users.length > 0) console.log(users[0].name);
else 'User dont exist';

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
//default values
//const { menu = [], starterMenu: starters = [] } = restaurant;

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
//{a, b} = obj this doesn't work, have to wrap in parenthesis
({ a, b } = obj);

//////////////////////////////////////
//Destructing Arrays

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);
//works with destructuring
for (const [i, el] of menu.entries()) {
  console.log(`${i} + 1}: ${el}`);
}

/* const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr); 

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//Switching variables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

//Receive 2 return values from a funcition
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

 const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients); *

//SPREAD vs REST

//SPREAD on RIGHT side
const arr = [1, 2, ...[3, 4]];
console.log(arr);

//REST because LEFT side
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(`a: ${a}, b: ${b}, others ${others}`);

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(4, 5, 19, 0, 1);
add(3, 1, 6, 4, 3, 1, 4, 9);

//short circuiting
restaurant.numGuests = 20;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

restaurant.numGuests = 0;
//Nullish Coalescing Operater (Null and undefined (NOT 0 or ''))
const guestCorrect = restaurant.numGuests ?? 10;
console.log('Guests:', guestCorrect);

console.log('---AND--');
console.log(0 && 'Jonas');
console.log(7 && 'Trevin');

console.log('Hello' && 23 && null && 'Trevin');

//Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovannia Rossi',
};

//OR Assignment operator
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 11;
/* //rest1.numGuests ||= 10;
//rest2.numGuests ||= 11;

//Nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 12; 

console.log(rest1);
console.log(rest2);
*/
