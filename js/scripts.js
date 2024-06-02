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

  function add (pokemon) { //only adds pokemon to pokemonList if it is and object and has the correct object keys
    if (typeof pokemon === 'object') {
      if ( typeof pokemon.name === 'string' && typeof pokemon.height === 'number' && typeof pokemon.types === 'object') {
        pokemonList.push(pokemon);
      }
    }
  }

  function addListItem(pokemon) {
    let listOfPokemons = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = `${pokemon.name}`;
    button.classList.add('button');
    listItem.appendChild(button);
    showDetails(button, pokemon);
    listOfPokemons.appendChild(listItem);
  }

  function showDetails(button, pokemon) {
    button.addEventListener('click', function () {
      console.log(`${pokemon.name}`);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };
}) ();


pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
