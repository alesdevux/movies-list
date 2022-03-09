const domMovies = document.getElementById('movies')
// const deleteModal = document.getElementById('delete-modal')
// let deleteMovie
// let cancelDelete

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


function editMovie(id) {
  alert(`Are you sure you want to edit ${id}?`)
}

function modalDeleteMovie(id) {
  const modalDelete = document.getElementById(`delete-movie-${id}`)
  modalDelete.classList.remove('hide-delete-movie')
  modalDelete.classList.add('view-delete-movie')
}

function cancelModalDelete(id) {
  const modalDelete = document.getElementById(`delete-movie-${id}`)
  modalDelete.classList.remove('view-delete-movie')
  modalDelete.classList.add('hide-delete-movie')
}

function deleteMovie(id) {
  const movieSelect = movies.filter(movie => movie.id == id)[0]

  alert(`Are you sure you want to delete ${movieSelect.title}?`)
}

function viewMovies(movies) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    const movieId = "movie-" + movie.id
    const deleteMovieId = "delete-movie-" + movie.id

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
    // console.log(stars)
    // console.log(movie.id)

    domMovies.innerHTML += `
      <div class="movie" id="${movieId}">
        <div class="bg-filter">
          <h2>${movie.title}</h2>
          <div id="${deleteMovieId}" class="hide-delete-movie"></div>
          <div class="edit-delete">
            <div class="edit" onclick="editMovie(${movie.id})">
              <img src="./assets/svg/edit.svg" alt="edit" class="edit-icon">
            </div>
            <div class="delete" onclick="modalDeleteMovie(${movie.id})">
              <img src="./assets/svg/delete.svg" alt="delete" class="delete-icon">
            </div>
          </div>
          <div class="movie-info">
            <div class="categories">
              <span class="category">${movie.category}</span>
            </div>
            <p class="director">${movie.director}</p>
            <div class="time-stars">
              <p class="time">${movie.time}</p>
              <div class="stars">
                ${stars}
                <span>${movie.stars}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    const domMovie = document.getElementById(movieId)
    domMovie.style.backgroundImage = `url("./assets/img/${movie.img}")`

    const printDeleteMovie = document.getElementById(deleteMovieId)
    printDeleteMovie.innerHTML = `
      <div class="delete-text">
        <p>Do you want to remove <span class="title-delete">${movie.title}</span> from your list?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div class="delete-buttons">
        <button class="delete-movie" onclick="deleteMovie(${movie.id})">Delete movie</button>
        <button class="cancel-delete" onclick="cancelModalDelete(${movie.id})">No, cancel</button>
      </div>
    `
  }
}
