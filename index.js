const domMovies = document.getElementById('movies');
let movies = []
domMovies.innerHTML = ``

fetch('db.json')
  .then(response => response.json())
  .then(data => {
    movies = data.movies
  })
  .then(() => {
    viewMovies(movies)
  })

function viewMovies(movies) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    domMovies.innerHTML += `
      <div class="movie">
        <h2>${movie.title}</h2>
      </div>
    `
  }
}