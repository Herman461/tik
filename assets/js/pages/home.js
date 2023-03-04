document.addEventListener('DOMContentLoaded', function() {


    // Воспроизведение видео

    const videoSliders = document.querySelectorAll('.page__slider')

    if (videoSliders.length > 0) {
        for (let index = 0; index < videoSliders.length; index++) {
            const videoSlider = videoSliders[index]

            videoSlider.addEventListener('mousemove', debounce(playVideo, 50))


            videoSlider.addEventListener('swiped', function(e) {
                if (!e.target.closest('.block-video')) return
                if (e.target.closest('.block-video').querySelector('video.active')) return

                if (document.querySelector('video.active')) {
                    pauseCurrentVideo(document.querySelector('video.active'))
                }

                e.preventDefault()

                playVideo(e)
            })


        }

    }
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


    window.addEventListener('click', function(e) {
        if (e.target.closest('.block-video__likes') && !e.target.closest('.block-video__likes').classList.contains('disabled')) {

            const likesElement = e.target.closest('.block-video__likes')
            likesElement.querySelector('span').textContent = Number(likesElement.querySelector('span').textContent) + 1

            likesElement.classList.add('disabled')
            e.preventDefault()
        }

    })


    const pageSliders = document.querySelectorAll('.page__slider');

    if (pageSliders.length > 0) {

        document.body.addEventListener('scroll', debounce(uploadVideosOnScroll, 50));

        async function uploadVideosOnScroll() {
            for (let index = 0; index < pageSliders.length; index++) {
                const pageSlider = pageSliders[index];
                const pageSliderHeight = pageSlider.offsetHeight;
                const pageSliderOffset = offset(pageSlider).top;
                const animStart = 10;

                let pageSliderPoint = window.innerHeight - pageSliderHeight / animStart;
                if (pageSliderHeight > window.innerHeight) {
                    pageSliderPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if (
                    pageYOffset > pageSliderOffset - pageSliderPoint &&
                    pageYOffset < pageSliderOffset + pageSliderHeight
                ) {
                    if (!pageSlider.classList.contains('visible')) {
                        pageSlider.classList.add('visible')
                        await buildSlider(pageSlider)
                    }

                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }
        setTimeout(async () => {
            await uploadVideosOnScroll();
        }, 300);

        async function buildSlider(sliderWrapper) {

            const slider = sliderWrapper.querySelector('.slider__body')

            if (sliderWrapper.classList.contains('newly')) {
                const response = await fetch('/assets/database/lastVideos.json')
                const json = await response.json()

                const lastVideos = json.videos

                for (let index = 0; index < lastVideos.length; index++) {
                    const lastVideo = lastVideos[index]

                    const sliderItem = document.createElement('div')
                    sliderItem.className = 'slider__item item-slider'

                    sliderItem.innerHTML = `
                            <div class="block-video">
                                <div class="block-video__preview">
                                    <picture>
                                        <source srcset="${lastVideo.webpImageSrc}" type="image/webp">
                                        <source srcset="${lastVideo.jpgImageSrc}" type="image/jpeg">
                                        <img alt="" src="${lastVideo.jpgImageSrc}">
                                    </picture>
                                </div>

                                <div class="block-video__check">
                                    <svg>
                                        <use xlink:href="assets/images/icons/icons.svg#check-circle"></use>
                                    </svg>
                                </div>
                                <div class="block-video__info">
                                    <div class="block-video__username">"${lastVideo.username}"</div>
                                    <div class="block-video__count">
                                        <svg>
                                            <use xlink:href="assets/images/icons/icons.svg#users"></use>
                                        </svg>
                                        ${lastVideo.views}
                                    </div>
                                </div>
                                <a href="" class="block-video__link"></a>
                            </div>
                    
                    `

                    slider.appendChild(sliderItem)
                }


                swiperBuild(slider)
                initLastVideosSlider(sliderWrapper)

            } else {



                const response = await fetch('/assets/database/videos.json')
                const json = await response.json()

                let videos = json.videos


                while (videos.length > 0) {
                    const video = videos[0]

                    const slide = document.createElement('div')
                    slide.className = 'slider__item item-slider'

                    // Удаляем удаленные данные
                    videos = videos.filter(function( element ) {
                        return element !== undefined;
                    })


                    if (video.type === 'small') {
                        const firstBlock = buildSmallSlide(video)

                        slide.appendChild(firstBlock)

                        // Чистим от текущих данных слайда
                        videos.splice(0, 1)

                        const secondSmallBlockIndex = videos.findIndex(function(video) {
                            return video.type === 'small'
                        })

                        const secondBlock = buildSmallSlide(videos[secondSmallBlockIndex])

                        slide.appendChild(secondBlock)

                        // Чистим данные от 2 найденного слайда
                        videos.splice(secondSmallBlockIndex, 1)

                        slider.appendChild(slide)

                    } else if (video.type === 'big') {

                        slide.classList.add('slider__item_big')

                        slide.innerHTML = buildSlideBlock(video)
                        slider.appendChild(slide)
                        videos.splice(0, 1)
                    } else if (video.type === 'vertical') {

                        slide.innerHTML = buildSlideBlock(video)
                        slider.appendChild(slide)

                        videos.splice(0, 1)
                    } else if (video.type === 'horizontal') {
                        slide.className = 'slider__item slider__item_inner slider__item_big item-slider'

                        const horizontalBlock = buildHorizontalSlider(video)

                        slide.appendChild(horizontalBlock)

                        // Чистим от текущих данных слайда
                        videos.splice(0, 1)

                        const firstSmallBlockIndex = videos.findIndex(function(video) {
                            return video.type === 'small'
                        })

                        const firstBlock = buildSmallSlide(videos[firstSmallBlockIndex])

                        slide.appendChild(firstBlock)

                        // Чистим данные от 1 найденного слайда
                        videos.splice(firstSmallBlockIndex, 1)

                        slider.appendChild(slide)


                        const secondSmallBlockIndex = videos.findIndex(function(video) {
                            return video.type === 'small'
                        })

                        const secondBlock = buildSmallSlide(videos[secondSmallBlockIndex])

                        slide.appendChild(secondBlock)

                        // Чистим данные от 2 найденного слайда
                        videos.splice(secondSmallBlockIndex, 1)

                        slider.appendChild(slide)
                    }
                }



                swiperBuild(slider)
                initVideosSwiperSlider(sliderWrapper)


                const videoBlocks = sliderWrapper.querySelectorAll('.block-video')

                if (videoBlocks.length > 0) {
                    for (let index = 0; index < videoBlocks.length; index++) {
                        const videoBlock = videoBlocks[index]


                        videoBlock.addEventListener('mouseleave', pauseVideo)
                    }
                }
            }
        }

        function initVideosSwiperSlider(sliderWrapper) {
            new Swiper(sliderWrapper.querySelector('.slider__body'), {
                speed: 500,
                spaceBetween: 16,
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                lazy: {
                    loadPrevNext: true,
                },
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
                        sliderWrapper.classList.add('init')
                    },

                },
                navigation: {
                    nextEl: sliderWrapper.querySelector('.slider-button-next'),
                    prevEl: sliderWrapper.querySelector('.slider-button-prev')
                },
            })
        }

        function buildSmallSlide(data) {
            const itemSliderBlock = document.createElement('div')
            itemSliderBlock.className = 'item-slider__block'
            itemSliderBlock.innerHTML = buildSlideBlock(data)

            return itemSliderBlock
        }
        function buildHorizontalSlider(data) {
            const itemSliderBlock = document.createElement('div')
            itemSliderBlock.className = 'item-slider__block item-slider__block_big'
            itemSliderBlock.innerHTML = buildSlideBlock(data)

            return itemSliderBlock
        }
        function buildSlideBlock(data) {
            return `
                                <div class="block-video">
                                    <video class="lazy-video" muted="muted" poster="${data.poster}">
                                        <source data-src="${data.videoSrc}" type="video/webm">
                                    </video>
                                    <div class="block-video__check">
                                        <svg>
                                            <use xlink:href="assets/images/icons/icons.svg#check-circle"></use>
                                        </svg>
                                    </div>
                                    <div class="block-video__views">
                                        <svg>
                                            <use xlink:href="assets/images/icons/icons.svg#eye"></use>
                                        </svg>
                                        ${data.views}
                                    </div>
                                    <div class="block-video__favorite">
                                        <svg>
                                            <use xlink:href="assets/images/icons/icons.svg#favorite"></use>
                                        </svg>
                                    </div>
                                    <div class="block-video__likes">
                                        <span>${data.likesCount}</span>
                                        <svg>
                                            <use xlink:href="assets/images/icons/icons.svg#favorite"></use>
                                        </svg>
                                    </div>
                                    <a href="" class="block-video__link"></a>
                                </div>     
        `
        }
    }


    function initLastVideosSlider(sliderWrapper) {
        new Swiper(sliderWrapper.querySelector('.slider__body'), {
            speed: 500,
            spaceBetween: 16,
            slidesPerView: 2,
            slidesPerGroup: 2,
            lazy: {
                loadPrevNext: true,
            },
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

                    sliderWrapper.classList.add('init')
                },

            },
            navigation: {
                nextEl: sliderWrapper.querySelector('.slider-button-next'),
                prevEl: sliderWrapper.querySelector('.slider-button-prev')
            },
        })
    }
})

function onSliderInit(strElement) {
    const slider = document.querySelector(strElement).closest('.slider')
    slider.classList.add('init')
}
// const firstSlider = new Swiper('.slider__body_first', {
//     speed: 500,
//     spaceBetween: 16,
//     slidesPerView: 'auto',
//     slidesPerGroup: 1,
//     lazy: {
//         loadPrevNext: true,
//     },
//     breakpoints: {
//         1300.98: {
//
//             slidesPerGroup: 5
//         },
//         767.98: {
//             slidesPerGroup: 4,
//
//         },
//         575.98: {
//             slidesPerGroup: 3,
//         }
//     },
//     on: {
//         afterInit() {
//             onSliderInit('.slider__body_first')
//         },
//
//     },
//     navigation: {
//         nextEl:
//             document.querySelector('.slider__body_first').closest('.slider__main')
//                 .querySelector('.slider-button-next'),
//         prevEl:
//             document.querySelector('.slider__body_first').closest('.slider__main')
//                 .querySelector('.slider-button-prev')
//     },
// })
//

//
// const thirdSlider = new Swiper('.slider__body_third', {
//     speed: 500,
//     spaceBetween: 16,
//     slidesPerView: 'auto',
//     slidesPerGroup: 1,
//     lazy: {
//         loadPrevNext: true,
//     },
//     breakpoints: {
//         1300.98: {
//
//             slidesPerGroup: 5
//         },
//         767.98: {
//             slidesPerGroup: 4,
//
//         },
//         575.98: {
//             slidesPerGroup: 3,
//         }
//     },
//     on: {
//         afterInit() {
//             onSliderInit('.slider__body_third')
//         },
//
//     },
//     navigation: {
//         nextEl:
//             document.querySelector('.slider__body_third').closest('.slider__main')
//                 .querySelector('.slider-button-next'),
//         prevEl:
//             document.querySelector('.slider__body_third').closest('.slider__main')
//                 .querySelector('.slider-button-prev')
//     },
// })
//
// const fourthSlider = new Swiper('.slider__body_fourth', {
//     speed: 500,
//     spaceBetween: 16,
//     slidesPerView: 'auto',
//     slidesPerGroup: 1,
//     lazy: {
//         loadPrevNext: true,
//     },
//         breakpoints: {
//         1300.98: {
//
//             slidesPerGroup: 5
//         },
//         767.98: {
//             slidesPerGroup: 4,
//
//         },
//         575.98: {
//             slidesPerGroup: 3,
//         }
//     },
//     on: {
//         afterInit() {
//
//             onSliderInit('.slider__body_fourth')
//         },
//
//     },
//     navigation: {
//         nextEl:
//             document.querySelector('.slider__body_fourth').closest('.slider__main')
//                 .querySelector('.slider-button-next'),
//         prevEl:
//             document.querySelector('.slider__body_fourth').closest('.slider__main')
//                 .querySelector('.slider-button-prev')
//     },
// })
//

