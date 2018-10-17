const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

fetchTrainers()

})


function fetchTrainers(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(renderTrainers));
}

function renderTrainers (trainer) {
  const main = document.querySelector('main')

  const cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  const p = document.createElement('p')
  p.innerText = trainer.name

  const ul = document.createElement('ul')
  ul.className = "pokemon-list"
  trainer.pokemons.forEach(function(pokemon){
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement('button')
    releaseButton.innerText = 'Release'
    releaseButton.className = 'release'
    releaseButton.id = `${pokemon.id}`
    releaseButton.addEventListener('click', releasePokemon)
    li.append(releaseButton)
    ul.append(li)
  })


  const button = document.createElement('button')
  button.innerText = 'Add Pokemon'
  button.id = `${trainer.id}`
  button.addEventListener("click", addPokemonButton)



  cardDiv.append(p, button, ul)
  main.append(cardDiv)
}
function addPokemonButton(event){
  fetch(POKEMONS_URL,{
    method: "POST",
    headers:
    {
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  trainer_id: event.target.id
})

  })
  .then(res => res.json())
  .then(pokemon => renderPokemon(pokemon, event))
}

function renderPokemon(pokemon, event){
// if (event.target.parentNode.querySelector('button').id === event.target.id) {
  const div2 = event.target.parentNode
  const ul2 = div2.querySelector('ul')
  const li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  const releaseButton = document.createElement('button')
  releaseButton.innerText = 'Release'
  releaseButton.className = 'release'
  releaseButton.id = `${pokemon.id}`
  li.append(releaseButton)
  ul2.append(li)
  div2.append(ul2)
}


function releasePokemon(event) {
  const pokemonId = event.target.id
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE",
    headers:
    {
  'Content-Type': 'application/json'
  }
  })
event.target.parentNode.remove()


}
