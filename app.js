const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const speciesFilter = document.getElementById('speciesFilter');
let allCharacters = [];

function displayCharacters(characters) {
  gallery.innerHTML = '';
  characters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-image">
        <img src="${character.image}" alt="${character.name}">
      </div>
      <div class="card-info">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <button class="like">Like</button>
        <button class="dislike">Dislike</button>
        <p class="score">Puntaje: 0</p>
      </div>
    `;
    let score = 0;
    card.querySelector('.like').addEventListener('click', () => {
      score++;
      card.querySelector('.score').textContent = `Puntaje: ${score}`;
    });
    card.querySelector('.dislike').addEventListener('click', () => {
      score--;
      card.querySelector('.score').textContent = `Puntaje: ${score}`;
    });
    gallery.appendChild(card);
  });
}

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    allCharacters = data.results;
    displayCharacters(allCharacters);
  });

function filterCharacters() {
  const searchText = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;
  const speciesValue = speciesFilter.value;

  const filtered = allCharacters.filter(character => {
    const matchesName = character.name.toLowerCase().includes(searchText);
    const matchesStatus = !statusValue || character.status === statusValue;
    const matchesSpecies = !speciesValue || character.species === speciesValue;
    return matchesName && matchesStatus && matchesSpecies;
  });

  displayCharacters(filtered);
}

searchInput.addEventListener('input', filterCharacters);
statusFilter.addEventListener('change', filterCharacters);
speciesFilter.addEventListener('change', filterCharacters);

