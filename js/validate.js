function validate(form) {
    const inputs = [...form.querySelectorAll('input')]
    try {
        inputs.forEach((item) => {
            if (!item.value) {
                const error = new Error(`Campo ${item.id} invalido`)
                error.code = item.id
                throw error
            }
        })
        return true
    } catch (error) {
        console.log(error.message)
        console.log(error.code)
        // let input = confirm(error.message)
        // alert(input)
        let errorMsg
        /* switch (error.message) {
            case 'Campo i_nombre invalido':
                errorMsg = 'El nombre es obligatorio'
                break;
            case 'Campo i_passwd invalido':
                errorMsg = 'La password es obligatoria'
                break;
            default:
                errorMsg = 'Se ha produido un error'
                break;
        } */

        switch (error.code) {
            case 'i_nombre':
                errorMsg = 'El nombre es obligatorio'
                break;
            case 'i_passwd':
                errorMsg = 'La password es obligatoria'
                break;
            default:
                errorMsg = 'Se ha produido un error'
                break;
        }

        form.querySelector('p').innerHTML = errorMsg
        return false
    }

}

export default validate;