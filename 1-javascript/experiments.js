async function catchSomeOfEmParallel2() {
  let baseURL = 'https://pokeapi.co/api/v2/pokemon';
  let pokemon = await Promise.all([
    axios.get(`${baseURL}/1/`),
    axios.get(`${baseURL}/2/`),
    axios.get(`${baseURL}/3/`),
  ]);

  console.log(`The first pokemon is ${pokemon[0].name}`);
  console.log(`The second pokemon is ${pokemon[1].name}`);
  console.log(`The third pokemon is ${pokemon[2].name}`);
}

catchSomeOfEmParallel2();
