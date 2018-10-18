document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://localhost:3000';
  const TRAINERS_URL = `${BASE_URL}/trainers`;
  const POKEMONS_URL = `${BASE_URL}/pokemons`;
  const main = document.querySelector('main');
  getTrainers();

  function getTrainers () {
   fetch(TRAINERS_URL)
   .then(r => r.json())
   .then(trainers => trainers.forEach(displayTrainer))
  }

  function displayTrainer (trainer) {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.id = trainer.id;
    div.innerHTML = `<p>${trainer.name}</p><button class='add-pokemon' data-trainer-id= ${trainer.id}>Add Pokemon</button>`;
    div.addEventListener('click', (e) => {
      if (e.target.className === 'add-pokemon') {
        addPokemon(e);
      } else if (e.target.className === 'release') {
        releasePokemon(e);
      }
    });
    const ul = document.createElement('ul');
    trainer.pokemons.forEach((pokemon) => displayPokemon(pokemon, ul));
    div.append(ul);
    main.append(div);
  }

  function displayPokemon (pokemon, ul) {
    const li = document.createElement('li')
    li.dataset.id = pokemon.id;
    li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
    ul.append(li);
  }

  function addPokemon (e) {
    console.log(e.target.parentNode.dataset.id);
    const trainerId = e.target.parentNode.dataset.id;
    const ul = e.target.parentNode.querySelector('ul');
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({trainer_id: trainerId})
    };
    fetch(POKEMONS_URL, options)
    .then(r => r.json())
    .then((pokemon) => displayPokemon(pokemon, ul))
  }

  function releasePokemon (e) {
    console.log(e.target.parentNode);
    const pokemonID = e.target.dataset.pokemonId;
    const options = {
      method: 'DELETE'
    };
    fetch(`${POKEMONS_URL}/${pokemonID}`, options);
    e.target.parentNode.remove();
  }
})
