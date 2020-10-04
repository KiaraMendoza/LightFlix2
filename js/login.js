import validate from './validate.js';

const login = (e, users, loggedUser) => {
    e.preventDefault();
    const loginForm = document.querySelector('#login_form');
    if (!validate(loginForm)) {
        return;
    }
    // const users = window.localStorage.getItem(storeUsers) ? JSON.parse(window.localStorage.getItem(storeUsers)) : [];

    const inputs = [...loginForm.querySelectorAll('input')];
    console.log(inputs);

    let findUser = users.find(item => item.email.toLowerCase() == inputs[0].value.toLowerCase());

    if (findUser && findUser.email && findUser.password === inputs[1].value) {
        console.log(`Everything OK, welcome again ${findUser.name}`);
        window.sessionStorage.setItem('loggedUser', JSON.stringify(findUser));
        window.location = 'userPage.html';
        return findUser;
    } else {
        console.log('Incorrect data.');
        loginForm.querySelector('#error-message').innerHTML = 'Incorrect data';
        return;
    }
}

export default login;