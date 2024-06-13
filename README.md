# Pokédex Application

The Pokédex Application provides a comprehensive library of Pokémon, complete with their images and characteristics.

This app fetches data from an external API, allowing users to view detailed information about each Pokémon.

Data is sourced from PokeAPI.  
PokeAPI documentation: [PokeAPI Documentation](https://pokeapi.co/docs/v2)

## Key Features

- Load data from an external source (API)
- View a list of Pokémon
- View detailed information about each Pokémon on user interaction (e.g., clicking on a list item)

## Technologies Used

The application is built using HTML, CSS, and JavaScript, along with Bootstrap 5.

## General Structure

The page includes a header with a logo and a navigation bar built using Bootstrap. The navigation bar features a menu and an input field for filtering Pokémon. The main section displays the list of Pokémon. Each list item is clickable, showing Pokémon details in a modal. The Pokémon list and modal are generated using JavaScript.

## Functions

### `loadList()`

Fetches data from the external API and creates a new Pokémon object for each item. Calls the `add` function to add each Pokémon object to the `pokemonList` array and calls `loadDetails` function before calling the `addListItem` function to add the Pokémon to the HTML list.

### `loadDetails(item)`

Fetches data for the details of each Pokémon and stores specific properties in the item object.

### `add(pokemon)`

Checks if the object from PokeAPI is valid and ensures it has the correct keys before pushing the Pokémon to the `pokemonList` array.

### `getAll()`

Returns an array of all Pokémon in the `pokemonList`.

### `addListItem(pokemon)`

Creates a list of Pokémon in HTML and generates a button with an event listener to show the modal with details.

### `showDetails(pokemon)`

Calls `loadDetails` and then `showModal` to display the Pokémon details.

### `showModal(item)`

Creates a modal and displays the item details as defined by the `showDetails` function.

### `colorCode(type)`

Assigns a specific color to each Pokémon type.

### `filterPokemon(query)`

Filters the Pokémon list based on the user's input in the search bar in the header.