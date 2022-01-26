'use strict';

/* document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button')); */
const txtArea = document.querySelector('textarea');
const btn = document.querySelector('button');

//get the values from the textarea on button click
btn.addEventListener('click', function () {
  const values = txtArea.value;
  let counter = 1;
  let emoji = '✅';
  //separate the values on ' ' into an array
  const [...arrValues] = values.split('\n');
  const newWords = [];
  //for each of the values, capitalize the second word, found after the index of '_', THEN remove the '_'
  for (const word of arrValues) {
    //split up the string into an array using '_'
    let [...words] = word.split('_');
    words[0] = words[0][0].toLowerCase() + words[0].slice(1);
    //for the second word, set it to capitalize the first letter then concatenate the rest of the string
    words[1] = words[1][0].toUpperCase() + words[1].slice(1).toLowerCase();
    //rejoin the words
    let correctCamel = words.join('').padEnd(20, ' ');
    //push the string back to the new array
    correctCamel += emoji.repeat(counter);
    counter++;
    newWords.push(correctCamel);
  }

  txtArea.value = newWords.join('\n');
});

///////////Teacher's solution/////////
/* btn.addEventListener('click', function () {
  const rows = txtArea.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
    console.log(`${output.padEnd(20)}${emoji.repeat(i + 1)}`);
  }
}); */
