let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { //ensures pokemon object has the correct keys before pushing it to PokémonList
    if (typeof pokemon === 'object') {
      if (typeof pokemon.name === 'string' && typeof pokemon.detailsUrl === 'string') {
        pokemonList.push(pokemon);
      }
    } else {
      console.log("Pokemon doesn't have correct object format");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let listOfPokemons = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    listItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');
    listItem.setAttribute('style', 'height: 250px');
    listItem.setAttribute('role', 'listitem')

    let button = document.createElement('button');

    button.classList.add('btn', 'btn-light', 'border-dark', 'shadow', 'w-100', 'h-100');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#pokemonModal');


    let buttonContent = document.createElement('div');
    button.setAttribute('alt', `Button for details of Pokemon ${pokemon.name}`)
    buttonContent.setAttribute('style', 'height:100%; width:auto');

    let buttonImg = document.createElement('img');
    buttonImg.setAttribute('alt', `Image of Pokemon ${pokemon.name}`)
    buttonImg.setAttribute('style', 'height:80%; width:auto');

    let buttonText = document.createElement('p');
    buttonText.classList.add('w-100', 'mb-0', 'mt-2');

    buttonImg.src = pokemon.imageUrl;
    buttonText.innerHTML = pokemon.name;

    buttonContent.append(buttonImg, buttonText);

    button.appendChild(buttonContent);

    listItem.appendChild(button);
    listOfPokemons.appendChild(listItem);

    button.addEventListener('mouseenter', function () {
      buttonImg.src = pokemon.shinyUrl;
    });

    button.addEventListener('mouseleave', function () {
      buttonImg.src = pokemon.imageUrl;
    });

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() { //fetching pokemon data from external api
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        loadDetails(pokemon).then(function () {
          addListItem(pokemon);
        });
      });
    }).catch(function () {
      console.log('Error finding Pokemon');
    });
  }

  function loadDetails(item) {  //loads details data and stores specific properties in pokemon object
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other["official-artwork"].front_default;
      item.shinyUrl = details.sprites.other["official-artwork"].front_shiny;
      item.height = details.height / 10;
      item.types = details.types;
      item.weight = details.weight / 10;
      item.abilities = details.abilities;
    }).catch(function () {
      console.log('Error loading Pokemon details');
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
    let modalContent = document.querySelector('.modal-content');
    let modalHeader = document.querySelector('.modal-header');

    modalContent.setAttribute('alt', `Details of Pokemon ${item.name}`);

    modalTitle.innerText = item.name;

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
      <p>Type: ${item.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      <p>Abilities: ${item.abilities.map(typeInfo => typeInfo.ability.name).join(', ')}</p>`;
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
      default: '#f8f9fa'
    };
    return typeColor[type] || typeColor.default;
  }

  function filterPokemon(searchInput) {
    let filteredList = getAll().filter(pokemon => pokemon.name.includes(searchInput.toLowerCase()));
    document.querySelector('.pokemon-list').innerHTML = '';
    filteredList.forEach(pokemon => addListItem(pokemon));
  };

  document.getElementById('search-button').addEventListener('click', function () {
    let searchInput = document.querySelector('#search-input').value;
    filterPokemon(searchInput);
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    colorCode: colorCode,
    filterPokemon: filterPokemon
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      pokemonRepository.addListItem(pokemon);
    });
  });
});