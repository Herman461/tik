// Аватар пользователя

const uploadButton = document.querySelector('.avatar__upload-button')

const avatarWrapper = document.querySelector('.avatar')

const emptyAvatar = document.querySelector('.avatar__empty')

emptyAvatar.addEventListener('click', function (e) {
    const input = e.currentTarget.previousElementSibling

    input.click()
})

const avatarInput = document.querySelector('.avatar input')

avatarInput.addEventListener('change', function (e) {
    const avatar = e.currentTarget.files[0]

    const avatarBody = avatarInput.closest('.avatar')
    if (avatarBody.querySelector('.error')) {
        avatarBody.querySelector('.error').remove()
    }
    if (avatar.size < 204800) {
        const errorMessageText = 'The image size cannot be less than 200 kb.'

        const error = document.createElement('span')
        error.className = 'error'
        error.textContent = errorMessageText
        avatarBody.appendChild(error)

        setErrorAlert()
        return
    }

    if (avatar.size > 52428800) {
        const errorMessageText = 'The image size cannot be more than 50 mb.'

        const error = document.createElement('span')
        error.className = 'error'
        error.textContent = errorMessageText
        avatarBody.appendChild(error)

        setErrorAlert()
        returnf
    }

    const reader = new FileReader();
    reader.readAsDataURL(avatar);


    reader.onloadend = function () {

        if (document.querySelector('.avatar').querySelector('img')) {
            const img = document.querySelector('.avatar').querySelector('img')

            img.src = reader.result

        } else {
            const img = document.createElement('img')

            img.alt = 'User Photo'
            img.src = reader.result


            avatarWrapper.appendChild(img)
        }


        const submitButton = document.querySelector('.submit-button')

        if (submitButton.hasAttribute('disabled')) {
            submitButton.removeAttribute('disabled')
        }
        emptyAvatar.classList.add('hide')
    }

    uploadButton.classList.add('show')

    uploadButton.addEventListener('click', function(e) {
        const fileInput = e.currentTarget.parentElement.querySelector('input')
        fileInput.click()
    })
})

