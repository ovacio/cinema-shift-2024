const API_Films_Today = "https://shift-backend.onrender.com/cinema/today"

getMovies(API_Films_Today);
async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    showMovies(responseData);
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
                    <img 
                        src="${movie.img}"
                        class="movie_cover"
                        alt="${movie.name}"

                    />
                    <div class="movie__category">
                        <div class="category__name"></div>
                        <div class="category__details">${movie.releaseDate}</div>
                    </div>
                </div>
                <div class="movie__cover--darkened"></div>
                <div class="movie__info">
                    <div class="movie__title">${movie.name}</div>
                    <div class="movie__subtitle">${movie.originalName}</div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star check"></span>
                    <div class="movie__average">Kinopoisk - ${movie.userRatings.kinopoisk}</div>
                    <button type="button" class="more-info-button" data-movie-id="${movie.id}">Подробнее</button>
                </div>
                `;
        moviesEl.appendChild(movieEl);
    });
}

// info_film

document.addEventListener('click', function (event) {
    if (event.target.matches('.more-info-button')) {
        const movieId = event.target.getAttribute('data-movie-id');
        // Перенаправляем на вторую страницу и передаем ID фильма в URL
        window.location.href = 'index2.html?id=' + movieId;
    }
});

// seat_button
const seatElements = document.querySelectorAll('.seat');
seatElements.forEach(seat => {
    seat.addEventListener('click', function () {
        if (seat.classList.contains('clicked')) {
            seat.classList.remove('clicked');
        } else {
            seat.classList.add('clicked');
        }
    });
});

// info_film

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

getMovieser(API_Films_Today);
async function getMovieser(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    openInfoFilm(responseData, movieId);
}


function openInfoFilm(data, id) {
    const infoFilm = document.querySelector(".container__about__film");
    const moviesElem = document.querySelector(".movies");
    const selectedMovie = data.films.find(movie => movie.id === movieId);
    data.films.forEach((movie) => {
        const movieElem = document.createElement("div")
        movieElem.classList.add("movie")
        infoFilm.innerHTML = `
        <div class="block__info__film">
                <img src="${selectedMovie.img}"
                    class="img__block__info" />
                <div class="movie__category">
                    <div class="category__name">${selectedMovie.genres.slice(0, 3)}</div>
                    <div class="category__details"></div>
                </div>
            </div>
            <div class="discription">
                <span class="name__film">${selectedMovie.name}</span>
                <div class="subtitle__film">${selectedMovie.originalName}</div>
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star check"></span>
                <div class="movie__average">Kinopoisk - ${selectedMovie.userRatings.kinopoisk}</div>
                <div class="specifiction__film">${selectedMovie.description}</div>
            </div>
            `
    });
}