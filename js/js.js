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
const API_Films_Info = `https://shift-backend.onrender.com/cinema/film/${movieId}`

getMovieser(API_Films_Info);
async function getMovieser(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    openInfoFilm(responseData);
}

function openInfoFilm(data) {
    const infoFilm = document.querySelector(".container__about__film");

    const info_f = data.film;

    const infoFilm2 = document.createElement("div")
    infoFilm2.classList.add("info_f")
    infoFilm2.innerHTML = `
        <div class="block__info__film">
                <img src="${info_f.img}"
                    class="img__block__info" />
                <div class="movie__category__info">
                    <div class="category__name__info">${info_f.genres.slice(0, 3)}</div>
                    <div class="category__details__info"></div>
                </div>
            </div>
            <div class="discription__info">
                <span class="name__film__info">${info_f.name}</span>
                <div class="subtitle__film__info">${info_f.originalName}</div>
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star check"></span>
                <div class="movie__average__info">Kinopoisk - ${info_f.userRatings.kinopoisk}</div>
                <div class="specifiction__film__info">${info_f.description}</div>
            </div>
            `
    infoFilm.appendChild(infoFilm2);
}