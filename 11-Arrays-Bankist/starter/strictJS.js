'use strict';
//helps to write more secure code.

//Forbids certain things and forces visible errors

/* const checkDogs = (arrJ, arrK) => {
  const arrBoth = [...arrJ.slice(1, -2), ...arrK];
  arrBoth.map((dog, i) =>
    console.log(
      `Dog number ${i + 1} is a ${dog >= 3 ? 'adult' : 'puppy'} aged ${dog}`
    )
  );
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

let arr1 = [5, 2, 4, 1, 15, 8, 3];
let arr2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = arrAges =>
  arrAges
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

console.log(calcAverageHumanAge(arr1));
console.log(calcAverageHumanAge(arr2)); */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1.
dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
//console.log(dogs);
//2.
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
//console.log(sarahsDog);

const eatingRecFood = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

eatingRecFood(sarahsDog)
  ? console.log(
      `Eating right amount, Recommended Food: ${sarahsDog.recommendedFood} vs. Current Food: ${sarahsDog.curFood}`
    )
  : console.log(
      `Eating ${
        sarahsDog.curFood > sarahsDog.recommendedFood
          ? 'too much'
          : 'not enough'
      }, Recommended Food: ${sarahsDog.recommendedFood} vs. Current Food: ${
        sarahsDog.curFood
      }`
    );
//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4.
const ownersEatTooMuchString =
  ownersEatTooMuch.join(' and ') + `'s dogs eat too much!`;
console.log(ownersEatTooMuchString);

const ownersEatTooLittleString =
  ownersEatTooLittle.join(' and ') + `'s dogs eat too little!`;
console.log(ownersEatTooLittleString);

//5.
const dogEatingRight = dogs =>
  dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(dogEatingRight(dogs));

//6.
const dogEatingOkay = dogs => dogs.some(dog => eatingRecFood(dog));
console.log(dogEatingOkay(dogs));

//7.
const okayDogs = dogs.filter(dog => eatingRecFood(dog));
//console.log(okayDogs);

//8,
const dogs2 = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogs2);
