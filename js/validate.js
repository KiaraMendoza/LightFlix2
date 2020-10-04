function validate(form) {
    const inputs = [...form.querySelectorAll('input')];
    try {
        inputs.forEach((item) => {
            if (!item.value) {
                const error = new Error(`Error, check value of: ${item.id}.`);
                error.code = item.id;
                throw error;
            }
        })
        return true
    } catch (error) {
        let errorMsg;

        form.querySelector('#error-message').innerHTML = errorMsg;
        return false;
    }

}

export default validate;