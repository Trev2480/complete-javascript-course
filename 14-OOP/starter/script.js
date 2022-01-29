'use strict';

////// Lectures

//Arrow functions will not work as constructors, as they don't have a this keyword
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never make a function inside of a constructor, because each instance would have the function and that doens't make sense. Would also hamper performance as well. Stick the function on the prototype of the Class later
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

const trevin = new Person('Trevin', '1993');
console.log(trevin);
//Behind the scenes
//1. new empty object ({}) is created
//2. function is called this = {}
//3. {} linked to prototype
//4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 2017);
console.log(matilda, jack);

Person.hey = function () {
  console.log('Hey there');
  console.log(this);
};
Person.hey();
/*
//Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

trevin.calcAge();

console.log(trevin.__proto__);
console.log(trevin.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(trevin));
console.log(Person.prototype.isPrototypeOf(Person));
//Basically should be named .prototypeOfLinkedObjects instead of  Person.prototype

Person.prototype.species = 'Homo Sapiens';
console.log(trevin.species, matilda.species);
console.log(trevin.hasOwnProperty('firstName'));
console.log(trevin.hasOwnProperty('species'));

console.log(trevin.__proto__.__proto__);
console.log(trevin.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 3, 3, 5, 19];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

//Create a function for all arrays / extend functionality of Arrays - DONT get in the habit of doing this. New releases of JS might have the keyword. Also working on a team and everyone is creating the same method but naming it differently would be chaotic
Array.prototype.unique = function () {
  return [...new Set(this)];
};
//
console.log(arr.unique());

const h1 = document.querySelector('h1');
//check out the prototype chain
//console.dir(h1);
console.dir(x => x + 1);


// ES6 Classes

//class expression
//const PersonCl = class {}

//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  //Setting a property that already exists: need to use the underscore or else a bunch of recursion errors happend
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //Static Method
  static hey() {
    console.log('hey');
  }
}
const alice = new PersonCl('Alice Lam', 1996);
console.log(alice);
alice.calcAge();
console.log('Age', alice.age);
console.log(alice.__proto__ === PersonCl.prototype);

/* PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
}; 
alice.greet();

// 1. Classes are NOT hoisted, meaning you cannot use them before they are declared.
// 2. Classes can be passed into functions, and return them from functions.
// 3. Classes are executed in strict mode.

/// Getters and Setters

const account = {
  owner: 'Trevin',
  movements: [200, 100, 150, 600],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 50;
console.log(account.movements);

//Static Methods (see static function on Class Person Cl and Person.hey above)
PersonCl.hey();
*/
//Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
//Creates an object with the prototype specified in the parenthesis
const steven = Object.create(PersonProto);
/* console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); 

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
//Prototype chain:
//jay > StudentProto > PersonProto
jay.init('Jay', 2020, 'Computer Science');
jay.introduce();
jay.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

/// Inheritance between Classes: ES6 Classes

//the extends keyword will link the prototypes behind the scenes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //super always needs to happen first, as the super keyword is responsible for setting the "this" property
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}
//const martha = new StudentCl('Martha Jones', 2012);
const martha = new StudentCl('Martha Jones', 2012, 'Computer');
*/

///////////////Encapsulation: Private Class Fields and Methods
//Public fields
//Private fields
//Public methods
//Private Methods
class Account {
  //Public fields (on all instances)
  locale = navigator.language;

  //Private fields (not actually relaeased  in JS yet, but in stage 3, works in Google Chrome tho.)
  _movements = [];
  #pin;

  constructor(owner, curr, pin) {
    this.owner = owner;
    this.curr = curr;
    //Protected Property
    this.#pin = pin;
    //this._movements = [];
    //this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  //3) Public Methods
  //Public Interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
    return this;
  }
  withdrawal(val) {
    this.deposit(-val);
    return this; //makes the method chainable
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
      return this;
    }
  }
  //4 Private Methods (same as private fields, but doesn't work anywhere yet, Chrome treats as a private field right now)
  //#approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Trevin', 'USD', 1111);
console.log(acc1);

//acc1.movements.push(250); //Not a good idea, create a method to interact with the propertues instead
//Instead of above
acc1.deposit(250);
acc1.withdrawal(150);
acc1.requestLoan(1000);
acc1._approveLoan(1000); //should not be able to access, perfect example of why we need Encapsulation
//console.log(acc1.#movements);
///////////////Encapsulation: Protected Properties and Methods
//There is not ACTUALLY encapsulation in JavaScript, but we will  be mimicing it using the _var

//Chaining
acc1
  .deposit(300)
  .deposit(500)
  .withdrawal(25)
  .requestLoan(25000)
  .withdrawal(4000); //need to change the methods to "return this" to ensure that the results of the acc1.deposits call is the account, not undefined.

//Coding Challenge #1
/*
//constructor function
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercy = new Car('Mercedes', 95);
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
mercy.brake();
mercy.brake();
mercy.brake();
// CC 1 End
*/
//Coding Challenge 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 5;
    console.log(this.speed);
  }
  brake() {
    this.speed -= 10;
    console.log(this.speed);
    return this;
  }
  //since this is not the exact name as the speed property above, you are not setting the exact same property and don't have to use the underscore.
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
/*
const ty = new CarCl('Toyo', 45);
const chev = new CarCl('Chevy', 85);

ty.accelerate();
ty.accelerate();
ty.accelerate();
console.log(ty.speedUS);
ty.accelerate();
chev.brake();
chev.brake();
chev.brake();
chev.speedUS = 40;
console.log(chev.speed);

//Coding Challenge #3
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
//This links the prototypes together
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 100, 50);
console.log(tesla.__proto__);
tesla.brake();
tesla.accelerate();
*/

//Coding challenge #4
class EVCl extends CarCl {
  //Private field
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}
const myTesla = new EVCl('Tesla', 0, 70);

myTesla.accelerate().accelerate().accelerate().brake().chargeBattery(75);
