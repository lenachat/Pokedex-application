# Pokédex Application

The Pokédex Application provides a comprehensive library of Pokémon, complete with their images and characteristics.
This app fetches data from an external API, allowing users to view detailed information about each Pokémon on demand.

Data is sourced from PokeAPI.  
PokeAPI documentation: [PokeAPI Documentation](https://pokeapi.co/docs/v2)

## Key Features

- **List of Pokémon**: The app displays a list of Pokémon retrieved from the Pokémon API.
- **Details View**: Users can click on a Pokémon to view more detailed information.
- **Modal Display**: Pokémon details are shown in a modal popup.
- **Responsive Design**: The app is styled with CSS for a clean and simple interface that is responsive across different screen sizes.

## Technologies

- HTML
- CSS
- JavaScript
- Bootstrap
- - Pokémon API (`https://pokeapi.co/`)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## General Structure

The page includes a header with a logo and a navigation bar built using Bootstrap. The navigation bar features a menu and an input field for filtering Pokémon. The main section displays the list of Pokémon. Each list item is clickable, showing Pokémon details in a modal. The Pokémon list and modal are generated using JavaScript.

## Project Setup

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pokedex-app.git
    ```
   
2. Navigate into the project directory:
    ```bash
    cd pokedex-app
    ```

3. Open `index.html` in your browser to view the app.

## Live Demo

A live demo of the project is available on GitHub Pages: https://lenachat.github.io/Pokedex-application/

## Functions Overview

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