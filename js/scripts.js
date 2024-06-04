let pokemonRepository = (function (){

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add (pokemon) { //only adds pokemon to pokemonList if it is and object and has the correct object keys
    if (typeof pokemon === 'object') {
      if (typeof pokemon.name === 'string' && typeof pokemon.detailsUrl === 'string') {
        pokemonList.push(pokemon);
      }
    }
  }

  function getAll () {
    return pokemonList;
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function () {
      console.log('error');
    });
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (){
      console.log('error');
    });
  }

  function showDetails(button, item) {
    button.addEventListener('click', function () {
      pokemonRepository.loadDetails(item).then(function(){
            console.log(item);
      })
    });
  }
  
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
}) ();

pokemonRepository.loadList().then(function (){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


