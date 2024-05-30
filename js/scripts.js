pokemonList = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    types: ['grass', 'poison']
  },
  {
    name: 'Charizard',
    height: 1.7,
    types: ['fire', 'flying']
  },
  {
    name: 'Pidgey',
    height: 0.3,
    types: ['flying', 'normal']
  },
];

for (let i=0; i < pokemonList.length; i++) {

  if (pokemonList[i].height >1) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - WOW, that\'s big! <br>`);
  }
  
  else {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) <br>`);
  }

}

