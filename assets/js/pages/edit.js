document.addEventListener('DOMContentLoaded', function () {
    const addSocialButton = document.querySelector('.edit-body__add-button')
    const uploadButton = document.querySelector('.avatar-edit-body__upload-button')
    // Информация о пользователе

    function initUser() {
        if (!localStorage.getItem('user')) {
            const user = {
                id: '1',
                isVerified: false,
                avatarSrc: '',
            }

            localStorage.setItem('user', JSON.stringify(user))
        }

    }

    initUser()


    function updateUserData(e) {
        const button = e.currentTarget
        const loader = document.querySelector('.edit-body__loader')

        const data = localStorage.getItem('user')
        const user = JSON.parse(data)

        const profileForm = document.querySelector('.edit-body')

        button.classList.add('hide')
        loader.classList.remove('hide')


        new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('Success!')
            }, 2000)
        })
            .then(function (data) {
                setSuccessAlert(data)
                button.classList.remove('hide')
                loader.classList.add('hide')
                submitButton.setAttribute('disabled', '')
                clearEditForm()
            })
        localStorage.setItem('user', JSON.stringify(user))

        button.style.display = 'flex'
        e.preventDefault()
    }

    function clearEditForm() {
        const inputElements = document.querySelectorAll('.input.has-no-error')
        if (inputElements.length > 0) {
            for (let index = 0; index < inputElements.length; index++) {
                const input = inputElements[index]
                input.classList.remove('has-no-error')
            }
        }
    }

    const submitButton = document.querySelector('.edit-body__submit')

    submitButton.addEventListener('click', updateUserData)

    function getUserData(key) {
        const data = localStorage.getItem('user')
        const user = JSON.parse(data)

        return user[key]
    }

    // Социальные сети

    const socials = [
        {

            value: 'chaturbate',
            text: 'Chaturbate',
            icon: 'chaturbate',
            relativeUrl: 'm.chaturbate.com/'
        },
        {
            value: 'fansly',
            text: 'Fansly',
            icon: 'fansly',
            relativeUrl: 'fansly.com/'
        },
        {
            value: 'instagram',
            text: 'Instagram',
            icon: 'instagram',
            relativeUrl: 'instagram.com/'
        },
        {

            value: 'manyvids',
            text: 'Manyvids',
            icon: 'manyvids',
            relativeUrl: 'manyvids.com/'
        },
        {

            value: 'MyFreeCams',
            text: 'MyFreeCams',
            icon: 'MyFreeCams',
            relativeUrl: 'm.myfreecams.com/'
        },
        {
            value: 'onlyfans',
            text: 'OnlyFans',
            icon: 'onlyfans',
            relativeUrl: 'onlyfans.com/'
        },
        {
            value: 'patreon',
            text: 'Patreon',
            icon: 'patreon',
            relativeUrl: 'patreon.com/'
        },
        {
            value: 'pornhub',
            text: 'PornHub',
            icon: 'pornhub',
            relativeUrl: 'pornhub.com/'
        },
        {
            value: 'reddit',
            text: 'Reddit',
            icon: 'reddit',
            relativeUrl: 'reddit.com/'
        },
        {
            value: 'twitter',
            text: 'Twitter',
            icon: 'twitter',
            relativeUrl: 'twitter.com/'
        },
        {
            value: 'xhamster',
            text: 'xHamster',
            icon: 'xhamster',
            relativeUrl: 'xhamster.com/'
        },
    ]

    const accessSocials = JSON.parse(JSON.stringify(socials))

    function selectSocialItem(e) {
        if (e.target.closest('.select__item')) {
            const socialsWrapper = document.querySelector('.edit-body__socials')
            const clickedValue = e.target.closest('.select__item').dataset.value

            const currentSocialIndex = accessSocials.findIndex(function (item) {
                return item.value === clickedValue
            })

            const submitButton = document.querySelector('.edit-body__submit')

            if (submitButton.hasAttribute('disabled')) {
                submitButton.removeAttribute('disabled')
            }

            const currentSocial = accessSocials.splice(currentSocialIndex, 1)[0]

            e.target.closest('.socials-edit-body__select').remove()


            // Создание инпута
            const socialInput = document.createElement('div')
            socialInput.className = 'socials-edit-body__input socials-edit-body__input_flex'
            socialInput.dataset.value = clickedValue

            socialInput.innerHTML = `
            <div class="socials-edit-body__icon">
                <svg>
                    <use xlink:href="assets/images/icons/icons.svg#${currentSocial.icon}"></use>
                </svg>
            </div>
            <input type="text" class="input"> 
            <div class="socials-edit-body__trash">
                <svg>
                    <use xlink:href="assets/images/icons/icons.svg#trash"></use>
                </svg>
            </div>
        `
            socialsWrapper.appendChild(socialInput)
            socialInput.querySelector('input').value = currentSocial.relativeUrl
            socialInput.querySelector('input').focus()
            addSocialButton.classList.add('active')

            updateSocialList()

            if (accessSocials.length === 0) {
                addSocialButton.classList.add('hide')
            }
        }
    }

    function setSocialSelect() {
        if (!addSocialButton) return
        if (addSocialButton.classList.contains('active')) {
            addSocialButton.classList.remove('active')
        }
        if (accessSocials.length > 0) {
            const select = document.createElement('div')
            select.className = "socials-edit-body__select select"
            select.addEventListener('click', selectSocialItem)


            const selectHead = document.createElement('div')
            selectHead.textContent = 'Choose'
            selectHead.className = 'select__head'

            selectHead.addEventListener('click', function () {
                slideToggle(selectHead.nextElementSibling)
                selectHead.classList.add('active')
            })

            select.appendChild(selectHead)

            let selectList = document.createElement('ul')
            selectList.hidden = true
            selectList.className = 'select__list'

            selectList = setSocialList(selectList)
            select.appendChild(selectList)
            document.querySelector('.edit-body__socials').appendChild(select)
        }
    }

    function setSocialList(socialList) {
        for (let index = 0; index < accessSocials.length; index++) {
            const social = accessSocials[index]

            if (social === undefined) continue

            const selectItem = document.createElement('li')

            selectItem.dataset.value = social.value
            selectItem.className = 'select__item'
            selectItem.innerHTML = `
                    <svg>
                        <use xlink:href="assets/images/icons/icons.svg#${social.icon}"></use>
                    </svg>
                    ${social.text}
                `

            socialList.appendChild(selectItem)
        }
        return socialList
    }

    function deleteSocialItem(e) {
        if (!e.target.closest('.socials-edit-body__trash')) return

        const trashButton = e.target.closest('.socials-edit-body__trash')

        const inputWrapper = trashButton.closest('.socials-edit-body__input')
        const currentValue = inputWrapper.dataset.value

        const currentSocialIndex = socials.findIndex(function (item) {
            return item.value === currentValue
        })

        const currentSocial = socials.find(function (item) {
            return item.value === currentValue
        })

        accessSocials.splice(currentSocialIndex, 0, currentSocial)

        inputWrapper.remove()

        if (addSocialButton && addSocialButton.classList.contains('hide')) {
            addSocialButton.classList.remove('hide')
        }

        updateSocialList()
    }

    function updateSocialList() {
        const socialLists = document.querySelectorAll('.edit-body .select__list')
        if (socialLists.length > 0) {
            for (let index = 0; index < socialLists.length; index++) {
                const socialList = socialLists[index]
                socialList.innerHTML = ''
                setSocialList(socialList)
            }
        }
    }

    if (addSocialButton) {
        addSocialButton.addEventListener('click', setSocialSelect)
    }
    setSocialSelect()

    window.addEventListener('click', deleteSocialItem)
    // Аватар пользователя

    const avatarWrapper = document.querySelector('.edit-body__avatar')

    const emptyAvatar = document.querySelector('.avatar-edit-body__empty')

    emptyAvatar.addEventListener('click', function (e) {
        const input = e.currentTarget.previousElementSibling

        input.click()
    })

    const avatarInput = document.querySelector('.edit-body__avatar input')

    avatarInput.addEventListener('change', function (e) {
        const avatar = e.currentTarget.files[0]

        if (avatar.size < 204800 || avatar.size > 52428800) {
            setErrorAlert()
            return
        }

        // const body = new FormData()
        // body.append( 'file', avatar )
        //
        // fetch('/your-endpoint', {
        //     method: 'POST',
        //     body: body
        // }).then(function(response) {
        //     // ... если результат успешный, то url созданой картинки цепляем на тег img
        // })
        // reader можно удалить ...

        const reader = new FileReader();
        reader.readAsDataURL(avatar);


        reader.onloadend = function () {

            if (document.querySelector('.edit-body__avatar').querySelector('img')) {
                const img = document.querySelector('.edit-body__avatar').querySelector('img')

                img.src = reader.result

            } else {
                const img = document.createElement('img')

                img.alt = 'User Photo'
                img.src = reader.result


                avatarWrapper.appendChild(img)
            }


            const submitButton = document.querySelector('.edit-body__submit')

            if (submitButton.hasAttribute('disabled')) {
                submitButton.removeAttribute('disabled')
            }
            emptyAvatar.classList.add('hide')
        }

        // ... до этого момента

        e.target.value = null
        uploadButton.classList.add('show')
    })



    uploadButton.addEventListener('click', function(e) {
        const fileInput = e.currentTarget.parentElement.querySelector('input')
        fileInput.click()
    })
    function renderUser() {
        const avatarSrc = getUserData('avatarSrc')
        if (avatarSrc) {
            const img = document.createElement('img')

            img.alt = 'User Photo'
            img.src = avatarSrc

            avatarWrapper.appendChild(img)

            emptyAvatar.classList.add('hide')
        }

        if (getUserData('isVerified') && document.querySelector('.edit-body__message')) {
            const verifiedMessage = document.querySelector('.edit-body__message')
            verifiedMessage.classList.add('hide')
        }
    }

    renderUser()

    const inputElements = document.querySelectorAll('.input')


    if (inputElements.length > 0) {
        for (let index = 0; index < inputElements.length; index++) {
            const element = inputElements[index]


            element.addEventListener('change', function (e) {

                // if (e.target.closest('.edit-body__eye') || e.target.closest('.edit-body__close-eye')) {
                //     e.stopPropagation()
                // }

                const submitButton = document.querySelector('.edit-body__submit')

                if (document.querySelector('.input.has-error') && !submitButton.hasAttribute('disabled')) {
                    submitButton.setAttribute('disabled', '')
                    return
                }

                if (!document.querySelector('.input.has-error') && submitButton.hasAttribute('disabled')) {
                    submitButton.removeAttribute('disabled')
                }
            })
        }
    }

    window.addEventListener('click', function(e) {
        if (
            !e.target.closest('.socials-edit-body__select')
            && document.querySelector('.select__head.active')
        ) {
            const activeSelectHead = document.querySelector('.select__head.active')

            activeSelectHead.classList.remove('active')
            slideToggle(activeSelectHead.nextElementSibling)
        }
    })



    const editBody = document.querySelector('.edit-body')

    editBody.addEventListener('click', function(e) {
        if (e.target.closest('.socials-edit-body__icon')) {
            const inputIcon = e.target.closest('.socials-edit-body__icon')
            const inputWrapper = inputIcon.closest('.socials-edit-body__input')
            inputWrapper.querySelector('input').focus()
        }
    })
})

