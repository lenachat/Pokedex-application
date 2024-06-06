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
      item.height = details.height / 10;
      item.types = details.types;
      item.weight = details.weight / 10;
    }).catch(function (){
      console.log('error');
    });
  }

  function showDetails(button, item) {
    button.addEventListener('click', function () {
      pokemonRepository.loadDetails(item).then(function(){
        showModal(item);
        console.log(item.types)
      })
    });
  }

  function showModal(item) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Modal Input
    let titleElement = document.createElement('h1');
    titleElement.innerText = item.name;

    let contentElement = document.createElement('div');
    contentElement.classList.add('content');

    let imageElement = document.createElement('img');
    imageElement.classList.add('image');

    imageElement.src = item.imageUrl;

    let detailsElement = document.createElement('p');
    detailsElement.classList.add('details');

    detailsElement.innerHTML = `Height: ${item.height} m <br> Weight:  ${item.weight} kg`;

    // Close Button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    modal.appendChild(closeButtonElement);
    closeButtonElement.addEventListener('click', hideModal);

    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    contentElement.appendChild(imageElement);
    contentElement.appendChild(detailsElement)

    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  window.addEventListener('click', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.target === modalContainer) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
}) ();

pokemonRepository.loadList().then(function (){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});