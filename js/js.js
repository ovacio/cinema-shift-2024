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
                </div>
                `;
        moviesEl.appendChild(movieEl);
    });
}
