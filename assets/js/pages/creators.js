
document.addEventListener('DOMContentLoaded', function() {
    const creatorSliders = document.querySelectorAll('.slider__body')

    for (let index = 0; index < creatorSliders.length; index++) {
        const creatorSlider = creatorSliders[index]
        new Swiper(creatorSlider, {
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
                    creatorSlider.closest('.slider').classList.add('init')
                },

            },
            navigation: {
                nextEl:
                    creatorSlider.closest('.slider__main')
                        .querySelector('.slider-button-next'),
                prevEl:
                    creatorSlider.closest('.slider__main')
                        .querySelector('.slider-button-prev')
            },
        })
    }

})

