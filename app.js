const gallery = document.getElementById('gallery');

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <button class="like">Like</button>
        <button class="dislike">Dislike</button>
        <p class="score">Puntaje: 0</p>
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
  });
