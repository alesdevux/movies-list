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

    // add star.svg for movie.stars
    let stars = ``
    for (let j = 0; j < movie.stars; j++) {
      stars += `<img src="./assets/svg/star.svg" alt="star" class="star">`
    }
    for (let x = movie.stars; x < 5; x++) {
      stars += `<img src="./assets/svg/star-outline.svg" alt="star-outline" class="star-outline">`
    }
    console.log(stars)

    domMovies.innerHTML += `
      <div class="movie" id="${id}">
        <div class="bg-filter">
          <h2>${movie.title}</h2>
          <div class="movie-info">
            <p>${movie.director}</p>
            <p>${movie.category}</p>
            <div class="stars">
              ${stars}
              <span>${movie.stars}</span>
            </div>
          </div>
        </div>
      </div>
    `
    const domMovie = document.getElementById(id)
    domMovie.style.backgroundImage = `url("./assets/img/${movie.img}")`
  }
}