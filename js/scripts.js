let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { //only adds pokemon to pokemonList if it is and object and has the correct object keys
    if (typeof pokemon === 'object') {
      if (typeof pokemon.name === 'string' && typeof pokemon.detailsUrl === 'string') {
        pokemonList.push(pokemon);
      }
    } else {
      console.log("pokemon doesn't have correct object format");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let listOfPokemons = document.querySelector('.pokemon-list');

    listItem = document.createElement('li');
    listItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4'); // Responsive column classes and margin-bottom

    let button = document.createElement('button');
    button.innerText = `${pokemon.name}`;
    button.classList.add('btn', 'btn-light', 'border', 'shadow');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#pokemonModal');

    listItem.appendChild(button);
    listOfPokemons.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {   //fetching data from external api (has json string format)
      return response.json();                         //converting the json string into javascript object
    }).then(function (json) {
      json.results.forEach(function (item) {  //iterating over each pokemon item in the array
        let pokemon = {                       //for each item in the json.results array a new pokemon object is created
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);                     // add function is called to pass each pokemon object to the pokemonList
      });
    }).catch(function () {
      console.log('error finding pokemon');
    });
  }

  function loadDetails(item) {              //expects a pokemon object with at least a detailsUrl property
    let url = item.detailsUrl;
    return fetch(url).then(function (response) { //fetching data from the specific detailsUrl and returns json promise
      return response.json();                     //json string is parsed to javascript object
    }).then(function (details) {               //adding specific properties to item object
      item.imageUrl = details.sprites.other["official-artwork"].front_default;
      item.gifUrl = details.sprites.other.showdown.front_default;
      item.height = details.height / 10;
      item.types = details.types;
      item.weight = details.weight / 10;
    }).catch(function () {
      console.log('error loading pokemon details');
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }


  function showModal(item) {
    let modalTitle = document.querySelector('#pokemonModalLabel');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerText = item.name;

    let modalHeader = document.querySelector('.modal-header');

    if (item.types[1]) {
      let firstType = item.types[0].type.name;
      let firstColor = colorCode(firstType);

      let secondType = item.types[1].type.name;
      let secondColor = colorCode(secondType);

      modalHeader.style.backgroundImage = `linear-gradient(to right, ${firstColor}, ${secondColor})`;
    } else {
      let type = item.types[0].type.name;
      let color = colorCode(type);
      modalHeader.style.backgroundImage = `linear-gradient(to right, white, ${color})`;

    };

    modalBody.innerHTML = `
      <img src="${item.imageUrl}" class="img-fluid" alt="${item.name}" style="width: 40%">
      <p>Height: ${item.height} m</p>
      <p>Weight: ${item.weight} kg</p>
      <p>Type: ${item.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>`;
  }

  function colorCode(type) {
    let typeColor = {
      grass: '#79c951',
      poison: '#a141a1',
      fire: '#f08030',
      flying: '#a890f0',
      water: '#6890f0',
      bug: '#a9b820',
      normal: '#a9a879',
      electric: '#f9d030',
      ground: '#e1c068',
      fairy: '#ef99ac',
      fighting: '#c13028',
      psychic: '#f95888',
      steel: '#b8b8d1',
      ice: '#98d8d8',
      ghost: '#705898',
      dragon: '#7138f8',
      dark: '#715848',
      default: '#A8A878'
    };
    return typeColor[type] || typeColor.default;
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    colorCode: colorCode
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});