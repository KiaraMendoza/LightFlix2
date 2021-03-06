export const Header = {
    render: (loggedUser) => {
        let menu;
        if (loggedUser && loggedUser.email) {
            menu = `                
                    <li class="nav-item"><a class="nav-link navbar-brand" href="/index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link navbar-brand" href="/views/userPage.html">Movies</a></li>
                    <li id="logout_button" class="nav-item"><a class="nav-link" href="/views/login.html">Logout</a></li>`;
        } else {
            menu = `
                    <li class="nav-item"><a class="navbar-brand nav-link" href="/index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/views/login.html">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="/views/register.html">Register</a></li>
                    <li class="nav-item"><a class="nav-link" href="/views/help.html">Help</a></li>`
        }
        return `
            <div class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <ul class="navbar-nav">${menu}</ul>
            </div>`
    }
} 