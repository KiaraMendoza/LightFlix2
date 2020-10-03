// Exports from the app
import { Footer } from '../views/partials/footer.js'
import { Header } from '../views/partials/header.js'

const renders = () => {
    // Get the logged user if there is any
    let loggedUser = window.sessionStorage.getItem('loggedUser') ? JSON.parse(window.sessionStorage.getItem('loggedUser')) : null;

    document.querySelector('footer').innerHTML = Footer.render(); // To render the dynamical footer on the <footer> of our page.

    // For the header we want to know the actual html page where the user is.
    const actualPage = window.location.pathname.lastIndexOf('/') + 1;
    const page = window.location.pathname.slice(actualPage); // So we extract the last /xxx.html from the pathname
    document.querySelector('header').innerHTML = Header.render(page, loggedUser); // Render the header on our <header>
}

document.addEventListener('DOMContentLoaded', renders)