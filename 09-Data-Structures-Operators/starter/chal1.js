'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
/* const [players1, players2] = game.players;
//console.log(players1, players2);

const [gk1, ...fieldPlayers1] = players1;
//console.log(gk1, fieldPlayers1);

const [gk2, ...fieldPlayers2] = players2;
//console.log(gk2, fieldPlayers2);

const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

//when you want to rename the variable, first select the original element then use the colon, then the new name.
const { team1, x: draw, team2 } = game.odds;
//Alt: const {odds: {team1, x: draw, team2}} = game;
//console.log(team1, draw, team2);

//takes all the names passed in, and turns them into an array, which we loop through
const printGoals = function (...names) {
  let total = 0;
  for (let i = 0; i < names.length; i++) {
    //console.log(names[i]);
    total++;
  }
  //console.log(total);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
//7:
team1 < team2 && console.log('Team 1 is more likely to win!');
team2 < team1 && console.log('Team 2 is more likely to win!');
 */
/////// Coding Challenge 2

/* //1.
for (const [i, el] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${el}`);
}
console.log(Object.values(game.odds));

//2. Calculate the avg odd
const average =
  //a: previous value, b: current value
  //takes the array, adds the previous value to the current value to reduce it down to a single value, then divides by the length
  Object.values(game.odds).reduce((a, b) => a + b) /
  Object.values(game.odds).length;
console.log(average);

//3. Print the odds (nicely)
const odds = Object.entries(game.odds);
console.log(odds);
//destructure the 2d array, with first element being team and 2nd the odds
for (const [team, odd] of odds) {
  const teamStr = team === 'x' ? 'draw' : game[team];
  console.log(`Odds of Victory for ${teamStr} : ${odd}`);
} */
///Challenge 3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. create an array 'events' (no duplicates)
const events = [new Set(gameEvents.values())];
console.log(events);

//2. remove event at 64 mins
gameEvents.delete(64);

//3.

console.log(
  `An event happened on average, every ${92 / gameEvents.size} minutes`
);

//4. loop over gameEvents and log each element to the console, marking whether it is in the first or second half.
for (const [time, event] of gameEvents.entries()) {
  time <= 45
    ? console.log(`[FIRST HALF] ${time}: ${event}`)
    : console.log(`[SECOND HALF] ${time}: ${event}`);
}
