import validate from './validate.js';

const register = (e, storeUsers, users) => {
    e.preventDefault();
    const registerForm = document.querySelector('#register_form');
    if (!validate(registerForm)) {
        return;
    }
    const inputs = [...registerForm.querySelectorAll('input')];
    console.log(inputs);
    if (inputs[1].value !== inputs[2].value) {
        registerForm.querySelector('#error-message').innerHTML = 'Passwords doesn\'t match';
        return;
    }
    const user = { // There is no [2] because is the validate-password field
        email: inputs[0].value,
        password: inputs[1].value,
        name: inputs[3].value,
        mobile: inputs[4].value,
        apiKey: inputs[5].value,
    }
    // const users = window.localStorage.getItem(storeUsers) ? JSON.parse(window.localStorage.getItem(storeUsers)) : [];
    users.push(user);

    window.localStorage.setItem(storeUsers, JSON.stringify(users));
    inputs.forEach(item => item.value = '');
    if (user && user.email && user.apiKey) {
        window.location = 'login.html';
    }
}

export default register;