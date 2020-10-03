// Exports from the app
import register from './register.js';
import login from './login.js';
import fetchMovies from './fetchMovies.js';
import renderMovies from './renderMovies.js';
// import { KEY } from './config.js'; // In our case we will get the API_KEY from the user's data on the localStorage.

const app = async () => {
    let storeUsers = 'users';
    let moviePage = 1;
    // Get the logged user if there is any
    let loggedUser = window.sessionStorage.getItem('loggedUser') ? JSON.parse(window.sessionStorage.getItem('loggedUser')) : null;
    // Get the users from the localStorage.
    const users = window.localStorage.getItem(storeUsers) ? JSON.parse(window.localStorage.getItem(storeUsers)) : [];

    const registerButton = document.querySelector('#register_button');
    const loginButton = document.querySelector('#login_button');
    const logoutButton = document.querySelector('#logout_button');
    const loadMoreMovies = document.querySelector('#load_more_movies');

    if (registerButton) {
        registerButton.addEventListener('click', (e) => register(e, storeUsers, users))
    }
    if (loginButton) {
        loginButton.addEventListener('click', (e) => login(e, users, loggedUser) )
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', () => { loggedUser = null; console.log('logout'); window.sessionStorage.clear(); });
    }
    if (loadMoreMovies) {
        loadMoreMovies.addEventListener('click', async () => { moviePage += 1; let moviesData = await fetchMovies(loggedUser, moviePage); renderMovies(moviesData) });
    }

    // To render the movies we need to know if we are on the user's page and if it's a valid user.
    const actualPage = window.location.pathname.lastIndexOf('/') + 1;
    const page = window.location.pathname.slice(actualPage); // So we extract the last /xxx.html from the pathname
    if (page === 'userPage.html') {
        console.log(page, loggedUser);
        if (loggedUser) {
            let moviesData = await fetchMovies(loggedUser);
            if (moviesData.results) {
                renderMovies(moviesData);
                document.querySelector('.user-name-container').text = 'Welcome again ' + loggedUser.name;
            }
        } else {
            window.location = 'login.html';
        }
    }
}


document.addEventListener('DOMContentLoaded', app)