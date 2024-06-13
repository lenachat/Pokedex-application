let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t?"string"==typeof t.name&&"string"==typeof t.detailsUrl&&e.push(t):console.log("Pokemon doesn't have correct object format")}function n(){return e}function i(e){let t=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("col-12","col-sm-6","col-md-4","col-lg-3","mb-4"),n.setAttribute("style","height: 250px"),n.setAttribute("role","listitem");let i=document.createElement("button");i.classList.add("btn","btn-light","border-dark","shadow","w-100","h-100"),i.setAttribute("data-bs-toggle","modal"),i.setAttribute("data-bs-target","#pokemonModal"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",`Details about ${e.name}`);let o=document.createElement("div");o.setAttribute("style","height:100%; width:auto");let r=document.createElement("img");r.setAttribute("aria-label",`Image of ${e.name}`),r.setAttribute("style","height:80%; width:auto");let l=document.createElement("p");l.classList.add("w-100","mb-0","mt-2"),r.src=e.imageUrl,l.innerHTML=e.name,o.append(r,l),i.appendChild(o),n.appendChild(i),t.appendChild(n),i.addEventListener("mouseenter",function(){r.src=e.shinyUrl}),i.addEventListener("mouseleave",function(){r.src=e.imageUrl}),i.addEventListener("click",function(){a(e)})}function o(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.other["official-artwork"].front_default,e.shinyUrl=t.sprites.other["official-artwork"].front_shiny,e.height=t.height/10,e.types=t.types,e.weight=t.weight/10,e.abilities=t.abilities}).catch(function(){console.log("Error loading Pokemon details")})}function a(e){o(e).then(function(){r(e)})}function r(e){let t=document.querySelector("#pokemonModalLabel"),n=document.querySelector(".modal-body"),i=document.querySelector(".modal-content"),o=document.querySelector(".modal-header");if(i.setAttribute("alt",`Details of Pokemon ${e.name}`),t.innerText=e.name,e.types[1]){let a=l(e.types[0].type.name),r=l(e.types[1].type.name);o.style.backgroundImage=`linear-gradient(to right, ${a}, ${r})`}else{let s=l(e.types[0].type.name);o.style.backgroundImage=`linear-gradient(to right, white, ${s})`}n.innerHTML=`
      <img src="${e.imageUrl}" class="img-fluid" alt="${e.name}" style="width: 40%">
      <p>Height: ${e.height} m</p>
      <p>Weight: ${e.weight} kg</p>
      <p>Type: ${e.types.map(e=>e.type.name).join(", ")}</p>
      <p>Abilities: ${e.abilities.map(e=>e.ability.name).join(", ")}</p>`}function l(e){let t={grass:"#79c951",poison:"#a141a1",fire:"#f08030",flying:"#a890f0",water:"#6890f0",bug:"#a9b820",normal:"#a9a879",electric:"#f9d030",ground:"#e1c068",fairy:"#ef99ac",fighting:"#c13028",psychic:"#f95888",steel:"#b8b8d1",ice:"#98d8d8",ghost:"#705898",dragon:"#7138f8",default:"#f8f9fa"};return t[e]||t.default}function s(t){let n=e.filter(e=>e.name.includes(t.toLowerCase()));document.querySelector(".pokemon-list").innerHTML="",n.forEach(e=>i(e))}return document.getElementById("search-button").addEventListener("click",function(){s(document.querySelector("#search-input").value)}),{getAll:n,add:t,addListItem:i,showDetails:a,loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){let n={name:e.name,detailsUrl:e.url};t(n),o(n).then(function(){i(n)})})}).catch(function(){console.log("Error finding Pokemon")})},loadDetails:o,showModal:r,colorCode:l,filterPokemon:s}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.loadDetails(e).then(function(){pokemonRepository.addListItem(e)})})}),document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("keydown",function(t){"Enter"===t.key&&e.querySelector("a").click()})});