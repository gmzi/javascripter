// SORT NUMBERS
let numbers = [100, 60, 1000, 2000];

numbers.sort(); // [100, 1000, 2000, 60] not cool

// So use comparator:
numbers.sort((a, b) => a - b); // [60, 100, 1000, 2000]

//SORT BY "NAME" PROPERTY OF OBJECTS
let instructors = [
  { name: 'Elie', favLang: 'English' },
  { name: 'Joel', favLang: 'Python' },
  { name: 'Alissa', favLang: 'JS' },
];

// sort the instructors by name alphabetically
instructors.sort(); // not going to help!

instructors.sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});
/** 
 * [ 
 *  0: {name: "Alissa", favLang: "JS"}
    1: {name: "Elie", favLang: "English"}
    2: {name: "Joel", favLang: "Python"}
]
**/

//SORT STRINGS (ALPHABETICAL BY DEFAULT)
let people = ['beto', 'carlos', 'aldo', 'daniel'];
people.sort(); // ["aldo", "beto", "carlos", "daniel"]
