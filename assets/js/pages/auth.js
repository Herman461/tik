document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.form-auth__button')
    const loader = document.querySelector('.form-auth__loader')

    function clearForm() {
        const inputElements = document.querySelectorAll('.input.has-no-error')
        if (inputElements.length > 0) {
            for (let index = 0; index < inputElements.length; index++) {
                const input = inputElements[index]
                input.classList.remove('has-no-error')
            }
        }
    }

    function toggleSubmitButton(e) {
        const input = e.currentTarget

        if (document.querySelector('.input.has-error') && !submitButton.hasAttribute('disabled')) {
            submitButton.setAttribute('disabled', '')
            return
        }

        if (!document.querySelector('.input.has-error') && submitButton.hasAttribute('disabled')) {
            submitButton.removeAttribute('disabled')
        }

        const fields = document.querySelectorAll('.form-auth__input .input')

        for (let index = 0; index < fields.length; index++) {

            const field = fields[index]

            if (field.value === '') {
                submitButton.setAttribute('disabled', '')
                if (field.classList.contains('has-no-error')) {
                    field.classList.remove('has-no-error')
                }

            }
        }
    }





    submitButton.addEventListener('click', function(e) {
        e.preventDefault()

        submitButton.classList.add('hide')
        loader.classList.remove('hide')

        new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('Success!')
            }, 2000)
        })
            .then(function (data) {
                setSuccessAlert(data)

                submitButton.classList.remove('hide')
                loader.classList.add('hide')

                submitButton.setAttribute('disabled', '')
                clearForm()

                document.location.href = './edit-account.html'

            })
    })

    const fields = document.querySelectorAll('.form-auth__input .input')
    for (let index = 0; index < fields.length; index++) {

        const field = fields[index]

        field.addEventListener('change', toggleSubmitButton)
    }
})
