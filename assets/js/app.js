const delay = 400

window.addEventListener('DOMContentLoaded', function() {
    // Поиск

    const searchBody = document.querySelector('.search-header__body')
    const searchResult = document.querySelector('.search-header__result')
    const searchInput = document.querySelector('.search-header__input .input')

    const searchOpenButton = document.querySelector('.search-header__button')

    searchOpenButton.addEventListener('click', function() {
        searchBody.classList.add('active')
        searchResult.classList.add('active')
        lockBody()

        if (document.querySelector('.header__menu.active')) {
            toggleMenu()
        }


        // Делаем поиск активным после окончания анимации
        setTimeout(() => {
            searchInput.focus()
            searchBody.classList.add('transition-end')
        }, delay)
    })

    const searchPrevButton = document.querySelector('.search-header__prev')

    searchPrevButton.addEventListener('click', function() {

        searchBody.classList.remove('transition-end')
        searchBody.classList.remove('active')
        searchResult.classList.remove('active')
        lockBody()
    })

    // Для избежания появления плейсхолдера на инпуте при сворачивании поиска
    searchPrevButton.addEventListener('mousedown', function(e) {
        e.preventDefault()
    })

    const searchFocusButton = document.querySelector('.search-header__icon')

    searchFocusButton.addEventListener('click', function() {
        searchInput.focus()
    })

    const searchClearButton = document.querySelector('.search-header__clear')

    searchClearButton.addEventListener('click', function() {
        searchInput.value = ''
        searchInput.focus()
        onSearchInputChange()
    })


    // Меню

    const menu = document.querySelector('.header__menu')
    let lock = false
    const burger = document.querySelector('.header__burger')

    burger.addEventListener('click', function() {

        if (lock) return

        lock = true

        toggleMenu()

        setTimeout(() => {
            lock = false
        }, delay)
    })

    function toggleMenu() {
        burger.classList.toggle('active')
        menu.classList.toggle('active')
        lockBody()
    }

    const header = document.querySelector('.header')

    header.addEventListener('click', function(e) {
        if (
            document.querySelector('.header__menu.active')
            && !e.target.closest('a')
            && !e.target.closest('.burger')
            && !e.target.closest('.main-menu__title')
            && !e.target.closest('.tags-menu__title')
        ) {
            toggleMenu()
        }
    })

    function addOrRemoveMobileClass() {
        if (isMobile.any() && !document.body.classList.contains('mobile')) {
            document.body.classList.add('mobile')
        }

        if (!isMobile.any() && document.body.classList.contains('mobile')) {
            document.body.classList.remove('mobile')
        }
    }
    addOrRemoveMobileClass()
    window.addEventListener('resize', debounce(addOrRemoveMobileClass, 150))



    const searchResponse = {
        tags: [
            {
                id: '1',
                value: 'Tag 1',
                link: '/'
            },
            {
                id: '2',
                value: 'Tag 1',
                link: '/'
            },
            {
                id: '3',
                value: 'Tranding1',
                link: '/'
            },
            {
                id: '4',
                value: 'Tag 1',
                link: '/'
            },
            {
                id: '5',
                value: 'Tag 1',
                link: '/'
            },
            {
                id: '6',
                value: 'Tag 1',
                link: '/'
            },
            {
                id: '7',
                value: 'Tranding1',
                link: ''
            },
            {
                id: '8',
                value: 'Tag 1',
                link: ''
            },
            {
                id: '9',
                value: 'Tag 1',
                link: ''
            },
            {
                id: '10',
                value: 'Tranding1',
                link: ''
            },
            {
                id: '11',
                value: 'Tag 1',
                link: ''
            },
            {
                id: '12',
                value: 'Tag 1',
                link: ''
            },
        ],
        users: [
            {
                id: '1',
                username: 'asian_sexdoll',
                isVerified: true,
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/users/01.webp',
                jpgImageSrc: 'assets/images/users/01.jpg',
            },
            {
                id: '2',
                username: 'asian_sexdoll',
                isVerified: false,
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: '',
                jpgImageSrc: '',
            },
            {
                id: '3',
                username: 'asian_sexdoll',
                isVerified: true,
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/users/01.webp',
                jpgImageSrc: 'assets/images/users/01.jpg',
            },
            {
                id: '4',
                username: 'asian_sexdoll',
                isVerified: true,
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/users/01.webp',
                jpgImageSrc: 'assets/images/users/01.jpg',
            },
            {
                id: '5',
                username: 'asian_sexdoll',
                isVerified: false,
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: '',
                jpgImageSrc: '',
            },
        ],
        videos: [
            {
                id: '1',
                name: 'bunny-girl-challenge',
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/preview.webp',
                jpgImageSrc: 'assets/images/preview.jpg',
                isVertical: false
            },
            {
                id: '2',
                name: 'bunny-girl-challenge',
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/preview.webp',
                jpgImageSrc: 'assets/images/preview.jpg',
                isVertical: true
            },
            {
                id: '3',
                name: 'bunny-girl-challenge',
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/preview.webp',
                jpgImageSrc: 'assets/images/preview.jpg',
                isVertical: true
            },
            {
                id: '4',
                name: 'bunny-girl-challenge',
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/preview.webp',
                jpgImageSrc: 'assets/images/preview.jpg',
                isVertical: false
            },
            {
                id: '5',
                name: 'bunny-girl-challenge',
                info: '(12K followers   34K views)',
                link: '',
                webpImageSrc: 'assets/images/preview.webp',
                jpgImageSrc: 'assets/images/preview.jpg',
                isVertical: false
            },
        ]
    }

    const headerSearch = document.querySelector('#header-search')

    headerSearch.addEventListener('input', debounce(onSearchInputChange, 150))

    function onSearchInputChange(e) {
        const value = document.querySelector('#header-search').value
        const searchClearButton = document.querySelector('.search-header__clear')

        const resultSearchContainer = document.querySelector('.result-search__container')
        if (value !== '') {

            if (!searchClearButton.classList.contains('show')) {
                searchClearButton.classList.add('show')
            }
            // fetch data and build DOM

            const response = searchResponse

            resultSearchContainer.innerHTML = ''

            if (response.tags.length > 0) {
                const tagsList = document.createElement('ul')
                tagsList.className = 'result-search__tags tags'

                for (let index = 0; index < response.tags.length; index++) {
                    const tagObj = response.tags[index]

                    const tagItem = document.createElement('li')
                    tagItem.className = 'tags__item'

                    tagItem.innerHTML = `
                    <a href="${tagObj.link}" class="tags__link">${tagObj.value}</a>
                `
                    tagsList.appendChild(tagItem)
                    resultSearchContainer.appendChild(tagsList)
                }

            }

            if (response.users.length > 0) {
                const usersList = document.createElement('ul')
                usersList.className = 'result-search__users users-result-search'

                for (let index = 0; index < response.users.length; index++) {
                    const userObj = response.users[index]

                    const userItem = document.createElement('li')
                    userItem.className = 'users-result-search__item'

                    let verifiedContent = ''

                    if (userObj.isVerified) {
                        verifiedContent = `
                        <div class="users-result-search__verified">
                            <svg>
                                <use xlink:href="assets/images/icons/icons.svg#check-circle"></use>
                            </svg>
                        </div>
                    `
                    }
                    let avatarContent = ''

                    if (userObj.webpImageSrc) {
                        avatarContent = `
                        <div class="users-result-search__avatar">
                            <picture>
                                <source srcset="${userObj.webpImageSrc}" type="image/webp">
                                <source srcset="${userObj.jpgImageSrc}" type="image/jpeg">
                                <img src="${userObj.jpgImageSrc}" alt="">
                            </picture>
                        </div>
                    `
                    } else {
                        avatarContent = `
                        <div class="users-result-search__avatar">
                            <picture>
                                <source srcset="assets/images/users/02.webp" type="image/webp">
                                <source srcset="assets/images/users/02.jpg" type="image/jpeg">
                                <img src="assets/images/users/02.jpg" alt="">
                            </picture>
                        </div>
                    `
                    }

                    userItem.innerHTML = `
                    <a class="users-result-search__link" href="">
                        ${avatarContent}
                        <div class="users-result-search__content">
                            <div class="users-result-search__name">${userObj.username}</div>
                            ${verifiedContent}
                            <div class="users-result-search__info">${userObj.info}</div>
                        </div>
                    </a>
                `

                    usersList.appendChild(userItem)
                    resultSearchContainer.appendChild(usersList)
                }

            }


            if (response.videos.length > 0) {
                const videosList = document.createElement('ul')
                videosList.className = 'result-search__videos videos-result-search'

                for (let index = 0; index < response.videos.length; index++) {
                    const videoObj = response.videos[index]

                    const videoItem = document.createElement('li')
                    videoItem.className = 'videos-result-search__item'


                    videoItem.innerHTML = `
                    <a href="${videoObj.link}" class="videos-result-search__link">
                        <div class="videos-result-search__preview ${videoObj.isVertical ? 'videos-result-search__preview_vertical' : ''}">
                            <picture>
                                <source srcset="${videoObj.webpImageSrc}" type="image/webp">
                                <source srcset="${videoObj.jpgImageSrc}" type="image/jpeg">
                                <img src="${videoObj.jpgImageSrc}" alt="">
                            </picture>
                        </div>
                        <div class="videos-result-search__content">
                            <div class="videos-result-search__name">${videoObj.name}</div>
                            <div class="videos-result-search__info">${videoObj.info}</div>
                        </div>
                    </a>
                `

                    videosList.appendChild(videoItem)
                    resultSearchContainer.appendChild(videosList)
                }

            }
        } else {
            if (searchClearButton.classList.contains('show')) {
                searchClearButton.classList.remove('show')
            }

            resultSearchContainer.innerHTML = `
            <div class="result-search__empty">No results</div>
        `
        }
    }

    function lockBody() {
        const scrollWidth = window.innerWidth - document.body.clientWidth

        document.body.classList.toggle('lock')

        document.body.style.paddingRight = scrollWidth + 'px'
    }

    const inputElements = document.querySelectorAll('.input')

    if (inputElements.length > 0) {
        for (let index = 0; index < inputElements.length; index++) {
            const element = inputElements[index]

            if (element.hasAttribute('data-input')) continue

            element.addEventListener('change', function(e) {

                const input = e.currentTarget

                if (input.dataset.inputMin) {

                    if (Number(input.dataset.inputMin) > input.value.length) {
                        const errorMessageText = 'This field requires at least ' + input.dataset.inputMin + ' characters.'

                        const error = document.createElement('span')
                        error.className = 'error'
                        error.textContent = errorMessageText

                        input.parentElement.appendChild(error)
                        input.classList.add('has-error')

                        setErrorAlert()
                        return
                    }
                }

                if (input.dataset.inputMax) {

                    if (Number(input.dataset.inputMax) < input.value.length) {

                        const errorMessageText = 'This field can have no more than ' + input.dataset.inputMax + ' characters.'

                        const error = document.createElement('span')
                        error.className = 'error'
                        error.textContent = errorMessageText

                        input.parentElement.appendChild(error)
                        input.classList.add('has-error')

                        setErrorAlert()

                        if (e.target.closest('.password')) {
                            e.target.closest('.password').classList.add('has-error')
                        }
                        return
                    }
                }

                if (input.hasAttribute('data-input-username')) {
                    const format = /^[A-Za-z0-9@_\-]+$/;
                    if (!format.test(input.value)) {
                        const errorMessageText = 'This field contains forbidden characters'

                        const error = document.createElement('span')
                        error.className = 'error'
                        error.textContent = errorMessageText

                        input.parentElement.appendChild(error)
                        input.classList.add('has-error')

                        setErrorAlert()
                        return
                    }


                }

                if (input.hasAttribute('data-input-email')) {
                    const format = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                    if (!format.test(input.value)) {
                        const errorMessageText = 'Email is not correct'

                        const error = document.createElement('span')
                        error.className = 'error'
                        error.textContent = errorMessageText

                        input.parentElement.appendChild(error)
                        input.classList.add('has-error')

                        setErrorAlert()
                        return
                    }


                }

                if (input.hasAttribute('data-input-confirmed-password')) {
                    const mainPasswordField = document.querySelector('.main-password')

                    if (mainPasswordField.value !== input.value) {
                        const errorMessageText = 'The password is not confirmed'

                        const error = document.createElement('span')
                        error.className = 'error'
                        error.textContent = errorMessageText

                        input.parentElement.appendChild(error)
                        input.classList.add('has-error')

                        setErrorAlert()
                        return
                    }


                }

                input.classList.add('has-no-error')


            }, true)

            element.addEventListener('focus', function(e) {
                const input = e.currentTarget

                if (input.classList.contains('has-error')) {
                    input.classList.remove('has-error')

                    const error = input.parentElement.querySelector('.error')
                    error.remove()

                    if (e.target.closest('.password')) {
                        e.target.closest('.password').classList.remove('has-error')
                    }
                }
            })
        }

    }


    const userHeaderAction = document.querySelector('.user-action-header')

    if (userHeaderAction) {
        userHeaderAction.addEventListener('click', function(e) {
            if (e.target.closest('.user-action-header__exit')) return

            if (document.querySelector('.menu.active')) {
                toggleMenu()
            }
            const userHeader = document.querySelector('.user-header')
            const userHeaderBlock = document.querySelector('.user-header__block')

            userHeader.classList.add('active')
            userHeaderBlock.classList.add('active')
        })
    }

    const userHeaderClose = document.querySelector('.user-header__close')

    if (userHeaderClose) {
        userHeaderClose.addEventListener('click', closeUserHeader)
    }

    const userHeader = document.querySelector('.user-header')

    if (userHeader) {
        userHeader.addEventListener('click', function(e) {
            if (!e.target.closest('.user-header__block')) {
                closeUserHeader()
            }
        })
    }


    function closeUserHeader() {
        const userHeader = document.querySelector('.user-header')
        const userHeaderBlock = document.querySelector('.user-header__block')

        userHeader.classList.remove('active')
        userHeaderBlock.classList.remove('active')
    }
})
function setErrorAlert() {
    const error = document.createElement('div')
    error.className = 'alert alert_error'
    error.textContent = 'Remove!'

    const currentAlerts = document.querySelectorAll('.alert')

    const currentAlertsLength = currentAlerts.length

    if (currentAlertsLength === 0) {
        error.style.bottom = '10px'
    } else {
        const errorOffset = 10

        error.style.bottom = (10 + (currentAlertsLength * currentAlerts[0].offsetHeight) + (errorOffset * currentAlertsLength ) ) + 'px'
    }
    document.body.appendChild(error)

    setTimeout(function() {
        error.remove()
    }, 2000)
}

function setSuccessAlert(data) {
    const alert = document.createElement('div')
    alert.className = 'alert alert_success'
    alert.textContent = data

    const currentAlerts = document.querySelectorAll('.alert')

    const currentAlertsLength = currentAlerts.length

    if (currentAlertsLength === 0) {
        alert.style.bottom = '10px'
    } else {
        const errorOffset = 10

        alert.style.bottom = (10 + (currentAlertsLength * currentAlerts[0].offsetHeight) + (errorOffset * currentAlertsLength ) ) + 'px'
    }
    document.body.appendChild(alert)

    setTimeout(function() {
        alert.remove()
    }, 2000)
}

const passwordFields = document.querySelectorAll('.password')
if (passwordFields.length > 0) {
    for (let index = 0; index < passwordFields.length; index++) {
        const passwordField = passwordFields[index]
        passwordField.addEventListener('click', function(e) {
            if (e.target.closest('.password__eye')) {
                const eye = e.target.closest('.password__eye')
                const inputWrapper = eye.closest('.password')

                inputWrapper.classList.add('visible')

                inputWrapper.querySelector('.input').setAttribute('type', 'text')
                inputWrapper.querySelector('.input').focus()
                e.stopPropagation()
            }

            if (e.target.closest('.password__close-eye')) {
                const closeEye = e.target.closest('.password__close-eye')
                const inputWrapper = closeEye.closest('.password')

                inputWrapper.classList.remove('visible')

                inputWrapper.querySelector('.input').setAttribute('type', 'password')
                inputWrapper.querySelector('.input').focus()
                e.stopPropagation()
            }
        })
    }

}

