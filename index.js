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
    const id = "movie-" + movie.id

    if (movie.img === "" || movie.img === null || movie.img === undefined) {
      movie.img = "default.png"
    }

    domMovies.innerHTML += `
      <div class="movie" id="${id}">
        <div class="bg-filter">
          <h2>${movie.title}</h2>
          <div class="movie-info">
            <p>${movie.director}</p>
            <p>${movie.category}</p>
            <p>${movie.starts}</p>
          </div>
        </div>
      </div>
    `
    const domMovie = document.getElementById(id)
    domMovie.style.backgroundImage = `url("./assets/img/${movie.img}")`
  }
}