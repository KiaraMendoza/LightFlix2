function validate(form) {
    const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('select')];
    try {
        inputs.forEach((item) => {
            if (!item.value) {
                const error = new Error(`Please, check value of: ${item.id}.`);
                console.log(item.id);
                error.code = item.id;
                throw error;
            }
        })
        return true
    } catch (error) {
        form.querySelector('#error-message').innerHTML = error;
        return false;
    }

}

export default validate;