import renderMovieDetails from './renderMovieDetails.js';

const renderMovies = (moviesData) => {
    if (!moviesData) {
        return;
    }
    console.log(moviesData.results);
    let moviesHTML = '';
    moviesData.results.forEach(movie => {
        moviesHTML += `
            <div class="col d-inline-block custom-card movie">
                <div class="movie-info">
                    <div class="movie-img"><img class="card-img-top" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="${movie.title} img"/></div>
                    <div class="card-body">
                        <p class="movie-title">${movie.title}</p>
                        <button id="movie-${movie.id}" type="button" class="movie-details-button btn btn-secondary">See details</button>
                        <div class="movie-details d-none">
                            <code>ID: ${movie.id}</code>
                            <p>Popularity: ${movie.popularity}</p>
                            <p class="movie-overview">Overview: ${movie.overview}</p>
                            <p>Release Date: ${movie.release_date}</p>
                        </div>
                    </div>
                </div>
            </div>`
    });
    document.querySelector('.movies-container').classList.remove('d-none');
    document.querySelector('.movies-container').innerHTML += moviesHTML;

    document.querySelectorAll(`.movie-details-button`).forEach(
        item => item.addEventListener('click', (e) => { renderMovieDetails(e) })
    )
}

export default renderMovies;