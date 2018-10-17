document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`
  const main = document.querySelector('main')

  getTrainers()

  function getTrainers() {
    fetch('http://localhost:3000/trainers')
      .then(r => r.json())
      .then(trainers => trainers.forEach(showTrainer))
  }

  function postPokemon(e) {
    if (e.target.parentElement.querySelectorAll('li')
      .length < 6) {
      fetch('http://localhost:3000/pokemons', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            trainer_id: e.target.dataset.trainerId
          })
        })
        .then(r => r.json())
        .then(pokemon => {
          let ul = e.target.parentElement.querySelector('ul')
          let li = showPokemon(pokemon)
          ul.append(li)
        })
    }
  }

  function releasePokemon(e) {
    e.target.parentElement.remove()
    fetch(`http://localhost:3000/pokemons/${e.target.dataset.pokemonId}`, {
      method: "DELETE"
    })
  }

  function showTrainer(trainer) {
    let div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = trainer.id
    let nameP = document.createElement('p')
    nameP.innerText = trainer.name
    let addPokemon = document.createElement('button')
    addPokemon.dataset.trainerId = trainer.id
    addPokemon.innerText = `Add Pokemon`
    addPokemon.addEventListener('click', (e) => postPokemon(e))
    let ul = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
      let li = showPokemon(pokemon)
      ul.append(li)
    })
    div.append(nameP, addPokemon, ul)
    main.append(div)
  }

  function showPokemon(pokemon) {
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseButton = document.createElement('button')
    releaseButton.className = 'release'
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener('click', releasePokemon)
    li.append(releaseButton)
    return li
  }
})