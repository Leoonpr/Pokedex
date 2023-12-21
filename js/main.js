const pokeName = document.querySelector(".pokename");
const pokeNumber = document.querySelector(".pokenumero");
const pokeImage = document.querySelector(".pokeimg");
const form = document.querySelector(".form");
const search = document.querySelector(".search");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let pokeSearch = 1;

const fetchPokemon = async (pokemon) => {
  const responseAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (responseAPI.status === 200) {
    const data = await responseAPI.json();
    return data;
  }
};

const showPokemon = async (pokemon) => {
  pokeNumber.innerHTML = "";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokeImage.style.display = "block";
    pokeName.innerHTML = `${data.name}`;
    pokeNumber.innerHTML = `${data.id} -`;
    pokeImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    search.value = "";
    pokeSearch = data.id;
  } else {
    pokeImage.style.display = "none";
    pokeName.innerHTML = "Não Encontrado :c";
    pokeNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showPokemon(search.value.toLowerCase());
});

prev.addEventListener("click", () => {
  if (pokeSearch > 1) {
    pokeSearch -= 1;
    showPokemon(pokeSearch);
  }
});

next.addEventListener("click", () => {
  pokeSearch += 1;
  showPokemon(pokeSearch);
});

showPokemon(pokeSearch);
