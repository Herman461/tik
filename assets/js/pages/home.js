document.addEventListener('DOMContentLoaded', function() {

    var Visible = function (target) {
        const offset = 1
        // Все позиции элемента
        var targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top + offset,
                left: window.pageXOffset + target.getBoundingClientRect().left,
                right: window.pageXOffset + target.getBoundingClientRect().right,
                bottom: window.pageYOffset + target.getBoundingClientRect().bottom - offset
            },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };
        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            return true
        } else {
            return false
        }
    };

    // Воспроизведение видео

    const videoSliders = document.querySelectorAll('.page__slider')

    if (videoSliders.length > 0) {
        for (let index = 0; index < videoSliders.length; index++) {
            const videoSlider = videoSliders[index]

            videoSlider.addEventListener('mousemove', debounce(playVideo, 100))
            // videoSlider.addEventListener('touchmove', function(e) {
            //
            //
            //     if (document.querySelector('video.active')) {
            //         pauseCurrentVideo(document.querySelector('video.active'))
            //     }
            //     // if (!e.target.closest('.slider-button-prev') && !e.target.closest('.slider-button-next')) {
            //     //     e.preventDefault()
            //     // }
            //     playVideo(e)
            // })
            videoSlider.addEventListener('touchstart', function(e) {


                function detectOffset(e) {
                    if (!e.target.closest('.block-video')) return
                    if (e.target.closest('.block-video').querySelector('video.active')) return

                    if (document.querySelector('video.active')) {
                        pauseCurrentVideo(document.querySelector('video.active'))
                    }
                    e.preventDefault()
                    playVideo(e)
                }
                e.currentTarget.addEventListener('touchmove', debounce(detectOffset, 50), {once: true})


                // if (!e.target.closest('.slider-button-prev') && !e.target.closest('.slider-button-next')) {
                //     e.preventDefault()
                // }


            })


        }

    }

    let lockLoadPosters = false
    function loadPosters() {


        if (lockLoadPosters) return

        lockLoadPosters = true;

        const videoSliders = document.querySelectorAll('.page__slider')

        if (videoSliders.length > 0) {
            for (let index = 0; index < videoSliders.length; index++) {
                const videoSlider = videoSliders[index]

                if (videoSlider.classList.contains('posters-loaded')) continue

                if (Visible(videoSlider)) {

                    const videos = videoSlider.querySelectorAll('video')
                    console.log(videos)
                    for (let index = 0; index < videos.length; index++) {
                        const video = videos[index]
                        video.poster = video.dataset.poster

                    }
                    videoSlider.classList.add('posters-loaded')
                }
            }
        }

        setTimeout(function() {
            lockLoadPosters = false
        }, 100)
    }
    loadPosters()
    document.body.addEventListener('scroll', loadPosters)
    function playVideo(e) {
        if (e.target.closest('.block-video')) {
            const video = e.target.closest('.block-video').querySelector('video')

            if (!video) return

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
            video.closest('.block-video').classList.add('active')
        }
    }
    function pauseVideo(e) {
        if (
            e.currentTarget.querySelector('video')
            && !e.currentTarget.querySelector('video').classList.contains('active')
        )  {
            return
        }

        const video = e.currentTarget.querySelector('video')
        if (!video) return

        pauseCurrentVideo(video)
    }

    function pauseCurrentVideo(video) {
        video.pause()
        video.currentTime = 0
        video.src = ""
        video.removeAttribute('src')
        video.classList.remove('active')
        video.closest('.block-video').classList.remove('active')
    }
    const videoBlocks = document.querySelectorAll('.block-video')

    if (videoBlocks.length > 0) {
        for (let index = 0; index < videoBlocks.length; index++) {
            const videoBlock = videoBlocks[index]
            videoBlock.addEventListener('mouseleave', pauseVideo)
        }
    }

    window.addEventListener('click', function(e) {
        if (e.target.closest('.block-video__likes') && !e.target.closest('.block-video__likes').classList.contains('disabled')) {

            const likesElement = e.target.closest('.block-video__likes')
            likesElement.querySelector('span').textContent = Number(likesElement.querySelector('span').textContent) + 1

            likesElement.classList.add('disabled')
            e.preventDefault()
        }

    })


    const creatorSliders = document.querySelectorAll('[data-creators]')

    for (let index = 0; index < creatorSliders.length; index++) {
        const slider = creatorSliders[index]

        let wasSliderChanged = false
        let wasImagesLoaded = false
        const swiperSlider = new Swiper(slider.querySelector('.slider__body'), {
            speed: 500,
            spaceBetween: 16,
            slidesPerView: 2,
            slidesPerGroup: 2,
            breakpoints: {
                1300.98: {
                    slidesPerView: 7,
                    slidesPerGroup: 7
                },
                1100.98: {
                    slidesPerView: 6,
                    slidesPerGroup: 6
                },
                900.98: {
                    slidesPerView: 5,
                    slidesPerGroup: 5
                },
                767.98: {
                    slidesPerView: 4,
                    slidesPerGroup: 4
                },
                575.98: {
                    slidesPerView: 3,
                    slidesPerGroup: 3
                }
            },
            on: {
                afterInit() {

                    slider.classList.add('init')
                },

                slideChange() {
                    if (wasSliderChanged) {
                        wasSliderChanged = true
                        return;
                    }

                    if (wasImagesLoaded) return

                    const slides = slider.querySelectorAll('.slider__item')

                    let index = 6

                    while (slides.length > index) {

                        const slide = slides[index]

                        if (!slide) break;

                        const preview = slide.querySelector('.block-video__preview')
                        const img = document.createElement('img')
                        img.src = preview.dataset.imageSrc
                        img.alt = preview.dataset.imageAlt

                        preview.appendChild(img)

                        index++
                    }
                    wasImagesLoaded = true
                }

            },
            navigation: {
                nextEl:
                    slider.querySelector('.slider-button-next'),
                prevEl:
                    slider.querySelector('.slider-button-prev')
            },
        })
    }
})

function onSliderInit(strElement) {
    const slider = document.querySelector(strElement).closest('.slider')
    slider.classList.add('init')
}

const firstSlider = new Swiper('.slider__body_first', {
    speed: 500,
    spaceBetween: 16,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    breakpoints: {
        1300.98: {

            slidesPerGroup: 5
        },
        767.98: {
            slidesPerGroup: 4,

        },
        575.98: {
            slidesPerGroup: 3,
        }
    },
    on: {
        afterInit() {
            onSliderInit('.slider__body_first')
        },

    },
})





const thirdSlider = new Swiper('.slider__body_third', {
    speed: 500,
    spaceBetween: 16,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    breakpoints: {
        1300.98: {

            slidesPerGroup: 5
        },
        767.98: {
            slidesPerGroup: 4,

        },
        575.98: {
            slidesPerGroup: 3,
        }
    },
    on: {
        afterInit() {
            onSliderInit('.slider__body_third')
        },

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


if (document.querySelector('.slider__body_fourth')) {
    const fourthSlider = new Swiper('.slider__body_fourth', {
        speed: 500,
        spaceBetween: 16,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        breakpoints: {
            1300.98: {

                slidesPerGroup: 5
            },
            767.98: {
                slidesPerGroup: 4,

            },
            575.98: {
                slidesPerGroup: 3,
            }
        },
        on: {
            afterInit() {

                onSliderInit('.slider__body_fourth')
            },

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
}

if (document.querySelector('.slider__body_fifth')) {
    const fifthSlider = new Swiper('.slider__body_fifth', {
        speed: 500,
        spaceBetween: 16,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        breakpoints: {
            1300.98: {

                slidesPerGroup: 5
            },
            767.98: {
                slidesPerGroup: 4,

            },
            575.98: {
                slidesPerGroup: 3,
            }
        },
        on: {
            afterInit() {

                onSliderInit('.slider__body_fourth')
            },

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
}


