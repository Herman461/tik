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


    // Воспроизведение видео

    const videoSliders = document.querySelectorAll('.page__slider')

    if (videoSliders.length > 0) {
        for (let index = 0; index < videoSliders.length; index++) {
            const videoSlider = videoSliders[index]

            videoSlider.addEventListener('mousemove', debounce(playVideo, 50))
            videoSlider.addEventListener('touchmove', playVideo)
            videoSlider.addEventListener('touchstart', playVideo)


        }

    }
    function playVideo(e) {
        if (e.target.closest('.block-video')) {
            const video = e.target.closest('.block-video').querySelector('video')

            if (video.classList.contains('lazy-video')) {
                for (let source in video.children) {

                    const videoSource = video.children[source];

                    if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                        videoSource.src = videoSource.dataset.src;
                    }
                }
                video.load();
                video.classList.remove("lazy-video");

            }
            video.play()
            video.classList.add('active')
        }
    }
    function pauseVideo(e) {
        if (!e.currentTarget.querySelector('video').classList.contains('active')) return

        const video = e.currentTarget.querySelector('video')
        video.pause()
        video.currentTime = 0
        video.src = ""
        video.removeAttribute('src')
        video.classList.remove('active')
    }
    const videoBlocks = document.querySelectorAll('.block-video')

    if (videoBlocks.length > 0) {
        for (let index = 0; index < videoBlocks.length; index++) {
            const videoBlock = videoBlocks[index]
            videoBlock.addEventListener('mouseleave', pauseVideo)
            videoBlock.addEventListener('touchend', pauseVideo)
        }
    }


    // Ленивая загрузка видео

    // const lazyLoadVideos = [].slice.call(document.querySelectorAll("video.lazy-video"));
    // if ("IntersectionObserver" in window) {
    //
    //     const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
    //         entries.forEach(function(video) {
    //             if (video.isIntersecting) {
    //                 for (let source in video.target.children) {
    //
    //                     const videoSource = video.target.children[source];
    //
    //                     if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
    //                         videoSource.src = videoSource.dataset.src;
    //                     }
    //                 }
    //                 video.target.load();
    //                 video.target.classList.remove("lazy-video");
    //
    //                 lazyVideoObserver.unobserve(video.target);
    //             }
    //         });
    //     });
    //     lazyLoadVideos.forEach(function(lazyVideo) {
    //         lazyVideoObserver.observe(lazyVideo);
    //     });
    // }
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

function changeSliderSideVisible(strElement) {
    const slider = document.querySelector(strElement)

    if (!slider) return

    const sliderWrapper = slider.closest('.slider__main')

    if (
        sliderWrapper.querySelector('.slider-button-prev.swiper-button-disabled')
        && !sliderWrapper.classList.contains('prev-disabled')
    ) {
        sliderWrapper.classList.add('prev-disabled')
    }

    if (
        sliderWrapper.querySelector('.slider-button-next.swiper-button-disabled')
        && !sliderWrapper.classList.contains('next-disabled')
    ) {
        sliderWrapper.classList.add('next-disabled')
    }

    if (
        !sliderWrapper.querySelector('.slider-button-prev.swiper-button-disabled')
        && sliderWrapper.classList.contains('prev-disabled')
    ) {
        sliderWrapper.classList.remove('prev-disabled')
    }

    if (
        !sliderWrapper.querySelector('.slider-button-next.swiper-button-disabled')
        && sliderWrapper.classList.contains('next-disabled')
    ) {
        sliderWrapper.classList.remove('next-disabled')
    }
}
const firstSlider = new Swiper('.slider__body_first', {
    speed: 400,
    spaceBetween: 16,
    slidesPerView: 2,
    breakpoints: {
        1300.98: {
            slidesPerView: 5,

        },
        767.98: {
            slidesPerView: 4,

        },
        575.98: {
            slidesPerView: 3,
        }
    },
    on: {
        afterInit() {
            changeSliderSideVisible('.slider__body_first')
        },
        slideChange() {
            changeSliderSideVisible('.slider__body_first')
        }
    },
    navigation: {
        nextEl:
            document.querySelector('.slider__body_first').closest('.slider__main')
            .querySelector('.slider-button-next'),
        prevEl:
            document.querySelector('.slider__body_first').closest('.slider__main')
            .querySelector('.slider-button-prev')
    },
})

const secondSlider = new Swiper('.slider__body_second', {
    speed: 400,
    spaceBetween: 16,
    slidesPerView: 2,
    breakpoints: {
        1300.98: {
            slidesPerView: 7,

        },
        1100.98: {
            slidesPerView: 6,
        },
        900.98: {
            slidesPerView: 5,
        },
        767.98: {
            slidesPerView: 4,

        },
        575.98: {
            slidesPerView: 3,
        }
    },
    on: {
        afterInit() {
            changeSliderSideVisible('.slider__body_second')
        },
        slideChange() {
            changeSliderSideVisible('.slider__body_second')
        }
    },
    navigation: {
        nextEl:
            document.querySelector('.slider__body_second').closest('.slider__main')
                .querySelector('.slider-button-next'),
        prevEl:
            document.querySelector('.slider__body_second').closest('.slider__main')
                .querySelector('.slider-button-prev')
    },
})

const thirdSlider = new Swiper('.slider__body_third', {
    speed: 400,
    spaceBetween: 16,
    slidesPerView: 2.5,
    breakpoints: {
        1300.98: {
            slidesPerView: 5,

        },
        767.98: {
            slidesPerView: 4,

        },
        575.98: {
            slidesPerView: 3,
        }
    },
    on: {
        afterInit() {
            changeSliderSideVisible('.slider__body_third')
        },
        slideChange() {
            changeSliderSideVisible('.slider__body_third')
        }
    },
    navigation: {
        nextEl:
            document.querySelector('.slider__body_third').closest('.slider__main')
                .querySelector('.slider-button-next'),
        prevEl:
            document.querySelector('.slider__body_third').closest('.slider__main')
                .querySelector('.slider-button-prev')
    },
})

const fourthSlider = new Swiper('.slider__body_fourth', {
    speed: 400,
    spaceBetween: 16,
    slidesPerView: 2,
    breakpoints: {
        1300.98: {
            slidesPerView: 5,

        },
        767.98: {
            slidesPerView: 4,

        },
        575.98: {
            slidesPerView: 3,
        }
    },
    on: {
        afterInit() {
            changeSliderSideVisible('.slider__body_fourth')
        },
        slideChange() {
            changeSliderSideVisible('.slider__body_fourth')
        }
    },
    navigation: {
        nextEl:
            document.querySelector('.slider__body_fourth').closest('.slider__main')
                .querySelector('.slider-button-next'),
        prevEl:
            document.querySelector('.slider__body_fourth').closest('.slider__main')
                .querySelector('.slider-button-prev')
    },
})


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

function onSearchInputChange() {
    const value = document.querySelector('#header-search').value

    const resultSearchContainer = document.querySelector('.result-search__container')
    if (value !== '') {
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
