const jeopardyWinnings = {
	regularPlay           : 2522700,
	watsonChallenge       : 300000,
	tournamentOfChampions : 500000,
	battleOfTheDecades    : 100000
};

//To loop over the properties (keys) in an object:
for (let prop in jeopardyWinnings) {
	console.log(prop);
	console.log(jeopardyWinnings[prop]);
}

// To sum all values:
let total = 0;
for (let prop in jeopardyWinnings) {
	//loop over keys
	total += jeopardyWinnings[prop]; //use each key to get value
}

console.log(`Ken Jennings Total Earnings: ${total}`);

// You technically CAN use for...in with an array
// But it simply loops over the indices (0,1,2,3,etc.)
for (let k in [ 88, 99, 77, 66 ]) {
	console.log(k);
}
