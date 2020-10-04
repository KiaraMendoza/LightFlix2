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
    const nationalitySelect = document.querySelector('#nationality-select');
    const communitiesSelect = document.querySelector('#communities-select');
    const citiesSelect = document.querySelector('#cities-select');

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
    if (nationalitySelect) {
        nationalitySelect.addEventListener('change', (e) => syncNatSelect(e));
    }
    if (communitiesSelect) {
        communitiesSelect.addEventListener('change', (e) => syncComSelect(e));
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

    const SpainCommunities = [
        { com: "Andalucia", cities: ["Almeria", "Cadiz", "Cordoba", "Granada", "Huelva", "Jaen", "Malaga", "Sevilla"] },
        { com: "Aragón", cities: ["Huesca", "Teruel", "Zaragoza"] },
        { com: "Canarias", cities: ["Las Palmas", "Santa Cruz de Tenerife"] },
        { com: "Cantabria", cities: ["Cantabria"] },
        { com: "Castilla y León", cities: ["Avila", "Burgos", "Leon", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"] },
        { com: "Castilla-La Mancha", cities: ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"] },
        { com: "Cataluña", cities: ["Barcelona", "Girona", "Lleida", "Tarragona"] },
        { com: "Ceuta", cities: ["Ceuta"] },
        { com: "Comunidad Valenciana", cities: ["Alicante", "Castellon", "Valencia"] },
        { com: "Comunidad de Madrid", cities: ["Madrid"] },
        { com: "Extremadura", cities: ["Badajoz", "Caceres"] },
        { com: "Galicia", cities: ["A Coruña", "Lugo", "Ourense", "Pontevedra"] },
        { com: "Islas Baleares", cities: ["Baleares"] },
        { com: "La Rioja", cities: ["La Rioja"] },
        { com: "Melilla", cities: ["Melilla"] },
        { com: "Navarra", cities: ["Navarra"] },
        { com: "País Vasco", cities: ["Alava", "Guipuzcoa", "Vizcaya"] },
        { com: "Principado de Asturias", cities: ["Asturias"] },
        { com: "Región de Murcia", cities: ["Murcia"] }
    ];

    function populateSelect(data, select) {
        let html = '<option></option>';
        data.forEach(item => html += `<option value="${item}">${item}</option>`);
        select.innerHTML = html;
    }
    
    const syncNatSelect = (e) => {
        let community;
        if (nationalitySelect.selectedIndex === 1) {
            community = SpainCommunities.map(item => item.com);
            communitiesSelect.parentElement.classList.remove('d-none');
            populateSelect(community, communitiesSelect);
        } else {
            communitiesSelect.parentElement.classList.add('d-none');
            citiesSelect.parentElement.classList.add('d-none');
            return;
        }
        console.log('community', community);
    }

    const syncComSelect = (e) => {
        const communityCities = communitiesSelect.selectedIndex ? SpainCommunities[communitiesSelect.selectedIndex - 1].cities : [];
        if (Array.isArray(communityCities) && communityCities.length > 0) {
            citiesSelect.parentElement.classList.remove('d-none');
            populateSelect(communityCities, citiesSelect);
        }
        console.log('communityCities', communityCities);
    }
}


document.addEventListener('DOMContentLoaded', app)