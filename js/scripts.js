let pokemonRepository = (function (){

  let pokemonList = [
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

  function getAll () {
    return pokemonList;
  }

  function add (item) { //only adds pokemon to pokemonList if it is and object and has the correct object keys
    if (typeof item === 'object') {
      if ( typeof item.name === 'string' && typeof item.height === 'number' && typeof item.types === 'object') {
        pokemonList.push(item);
      }
    }
  }

  return {
    getAll: getAll,
    add: add
  };
}) ();


pokemonRepository.getAll().forEach(function(item){
  if (item.height >1) {
    document.write(`${item.name} (height: ${item.height}) - WOW, that\'s big! <br>`);
  }
  else {
    document.write(`${item.name} (height: ${item.height}) <br>`);
  }
});
