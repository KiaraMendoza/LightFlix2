export const Header = {
    render: (page) => {
        let menu;
        switch (page) {
            // I will use the same menu listing when the user isn't logged in.
            case 'userPage.html':
                menu = `                
                    <li class="nav-item"><a class="nav-link navbar-brand" href="./index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="./login.html">Logout</a></li>`
                break
            default:
                menu = `
                    <li class="nav-item"><a class="navbar-brand nav-link" href="./index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="./login.html">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="./register.html">Register</a></li>
                    <li class="nav-item"><a class="nav-link" href="./help.html">Help</a></li>`
                break
        }
        return `
            <div class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <ul class="navbar-nav">${menu}</ul>
            </div>`
    }
} 