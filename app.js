const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const speciesFilter = document.getElementById('speciesFilter');
const totalLikesElem = document.getElementById('totalLikes');
const totalDislikesElem = document.getElementById('totalDislikes');

let allCharacters = [];
let scores = JSON.parse(localStorage.getItem('scores')) || {};

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
            <p>Estado: ${character.status === "Alive" ? "Vivo" : character.status === "Dead" ? "Muerto" : "Desconocido"}</p>
            <p>Especie: ${character.species}</p>
            <button class="like">Like</button>
            <button class="dislike">Dislike</button>
            <p class="score">Puntaje: ${scores[character.id] || 0}</p>
        </div>
`;


    let score = scores[character.id] || 0;

    card.querySelector('.like').addEventListener('click', () => {
      score++;
      scores[character.id] = score;
      localStorage.setItem('scores', JSON.stringify(scores));
      card.querySelector('.score').textContent = `Puntaje: ${score}`;
      updateTotal();
    });

    card.querySelector('.dislike').addEventListener('click', () => {
      score--;
      scores[character.id] = score;
      localStorage.setItem('scores', JSON.stringify(scores));
      card.querySelector('.score').textContent = `Puntaje: ${score}`;
      updateTotal();
    });

    gallery.appendChild(card);
  });
}

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    allCharacters = data.results;
    displayCharacters(allCharacters);
    updateTotal();
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

function updateTotal() {
  let totalLikes = 0;
  let totalDislikes = 0;

  Object.values(scores).forEach(value => {
    if (value > 0) totalLikes += value;
    if (value < 0) totalDislikes += Math.abs(value);
  });

  totalLikesElem.textContent = totalLikes;
  totalDislikesElem.textContent = totalDislikes;
}

searchInput.addEventListener('input', filterCharacters);
statusFilter.addEventListener('change', filterCharacters);
speciesFilter.addEventListener('change', filterCharacters);
