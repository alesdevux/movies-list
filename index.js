const urlServerMovies = 'http://localhost:3000/movies/'
const domMovies = document.getElementById('movies')
const btnAddMovie = document.getElementById('add-movie')
const sectionAddMovie = document.getElementById('section-add-movie')

let letFetch
let movies = []
let topIdMovie = 0
domMovies.innerHTML = ``

btnAddMovie.addEventListener('click', () => {
  if (btnAddMovie.getAttribute('active') === 'false') {
    btnAddMovie.setAttribute('active', 'true')
    sectionAddMovie.classList.remove('hide-add-movie')
    sectionAddMovie.classList.add('view-add-movie')
    document.body.style.overflow = 'hidden'
    return
  }
  if (btnAddMovie.getAttribute('active') === 'true') {
    btnAddMovie.setAttribute('active', 'false')
    sectionAddMovie.classList.remove('view-add-movie')
    sectionAddMovie.classList.add('hide-add-movie')
    document.body.style.overflow = 'auto'
    addMovie()
    // reset form values after submit
    document.getElementById('title').value = ''
    document.getElementById('director').value = ''
    document.getElementById('time').value = ''
    document.getElementById('stars').value = ''
    document.getElementById('category').value = ''
    document.getElementById('img').value = ''
    return
  }
})

function getMovies() {
  letFetch = fetch('db.json')
    .then(response => response.json())
    .then(data => {
      movies = data.movies
      idMovies()
    })
    .then(() => {
      viewMovies(movies)
    })
}

getMovies()

function modalEditMovie(id) {
  const modalEdit = document.getElementById(`edit-movie-${id}`)
  modalEdit.classList.remove('hide-edit-movie')
  modalEdit.classList.add('view-edit-movie')
}

function cancelModalEdit(id) {
  const modalEdit = document.getElementById(`edit-movie-${id}`)
  modalEdit.classList.remove('view-edit-movie')
  modalEdit.classList.add('hide-edit-movie')
}

function editMovie(id) {
  console.log(id)
  const title = `edit-title-${id}`
  const director = `edit-director-${id}`
  const time = `edit-time-${id}`
  const stars = `edit-stars-${id}`
  const category = `edit-category-${id}`
  const img = `edit-img-${id}`
  const movie = {
    id,
    title: document.getElementById(title).value,
    director: document.getElementById(director).value,
    time: document.getElementById(time).value,
    stars: document.getElementById(stars).value,
    category: document.getElementById(category).value,
    img: document.getElementById(img).value,
  }
  console.log(title)
  console.log(document.getElementById(title).value)
  fetch(urlServerMovies + id, {
    method: 'PUT',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      cancelModalEdit(id)
      viewMovies(movies)
    })
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
  fetch(urlServerMovies + id, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      viewMovies(data)
    })
}

function idMovies() {
  movies.forEach(movie => {
    if (movie.id > topIdMovie) {
      topIdMovie = movie.id
    }
  })
}

function addMovie() {
  const title = document.getElementById('title').value
  const director = document.getElementById('director').value
  const time = document.getElementById('time').value
  const stars = document.getElementById('stars').value
  const category = document.getElementById('category').value
  const img = document.getElementById('img').value
  const id = topIdMovie + 1

  if (title === '' || director === '' || time === '' || stars === '' || category === '') {
    alert('Please fill all fields')
    return
  }
  
  const movie = {
    id,
    title,
    director,
    category,
    time,
    stars,
    img,
  }
  fetch(urlServerMovies, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
    .then(response => response.json())
    .then(data => {
      viewMovies(data)
    })
}

function viewMovies(movies) {
  domMovies.innerHTML = ``
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    const movieId = "movie-" + movie.id
    const deleteMovieId = "delete-movie-" + movie.id
    const editMovieId = "edit-movie-" + movie.id

    if (movie.img === "" || movie.img === null || movie.img === undefined) {
      movie.img = "default.png"
    }

    let categories = movie.category
    let categoriesArray = categories.split(',')
    let viewCategories = ``
    for (let i = 0; i < categoriesArray.length; i++) {
      viewCategories += `<span class="category">${categoriesArray[i]}</span>`
    }

    // add star.svg for movie.stars
    let stars = ``
    for (let j = 0; j < movie.stars; j++) {
      stars += `<img src="./assets/svg/star.svg" alt="star" class="star">`
    }
    for (let x = movie.stars; x < 5; x++) {
      stars += `<img src="./assets/svg/star-outline.svg" alt="star-outline" class="star-outline">`
    }

    domMovies.innerHTML += `
      <div class="movie" id="${movieId}">
        <div class="bg-filter">
          <h2>${movie.title}</h2>
          <div id="${deleteMovieId}" class="hide-delete-movie"></div>
          <div id="${editMovieId}" class="hide-edit-movie"></div>
          <div class="edit-delete">
            <div class="edit" onclick="modalEditMovie(${movie.id})">
              <img src="./assets/svg/edit.svg" alt="edit" class="edit-icon">
            </div>
            <div class="delete" onclick="modalDeleteMovie(${movie.id})">
              <img src="./assets/svg/delete.svg" alt="delete" class="delete-icon">
            </div>
          </div>
          <div class="movie-info">
            <div class="categories">
              ${viewCategories}
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

    const printEditMovie = document.getElementById(editMovieId)
    printEditMovie.innerHTML = `
      <div class="edit-text">
        <input type="text" id="edit-title-${movie.id}" value="${movie.title}">
        <input type="text" id="edit-director-${movie.id}" value="${movie.director}">
        <input type="text" id="edit-time-${movie.id}" value="${movie.time}">
        <input type="text" id="edit-stars-${movie.id}" value="${movie.stars}">
        <input type="text" id="edit-category-${movie.id}" value="${movie.category}">
        <input type="text" id="edit-img-${movie.id}" value="${movie.img}">
      </div>
      <div class="edit-buttons">
        <button class="edit-movie" onclick="editMovie(${movie.id})">Edit movie</button>
        <button class="cancel-edit" onclick="cancelModalEdit(${movie.id})">No, cancel</button>
      </div>
    `
  }
}
