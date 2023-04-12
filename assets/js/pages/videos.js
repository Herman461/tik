



document.addEventListener('DOMContentLoaded', function() {
    const players = new Map()
    let allowedSound = false
    let allowedHd = false

    function onVideoDoubleClick(event) {
        this.pause();
    }

    const baseVideos = document.querySelectorAll('.video-js')

    if (baseVideos.length > 0) {
        for (let index = 0; index < baseVideos.length; index++) {
            const video = baseVideos[index]

            videojs(
                video.id,
                {
                    preload: 'auto',
                    inactivityTimeout: 0,
                    userActions: {
                        doubleClick: onVideoDoubleClick
                    }
                }
            ).ready(function(){
                window.customPlayer = this;
                players.set(video.id, customPlayer)
            });
        }
    }

    // Воспроизведение главного видео после загрузки страницы
    if (document.querySelector('.item-videos_main.video-js')) {
        const mainVideo = document.querySelector('.item-videos_main.video-js')
        const mainVideoItem = players.get(mainVideo.id);
        mainVideoItem.play()

    }

    // Сброс воспроизведения текущего видео
    function resetCurrentVideo() {

        const currentVideoElement = document.querySelector('.video-js.vjs-playing')

        if (!currentVideoElement) return

        if (!currentVideoElement.id) return

        const currentVideo = players.get(currentVideoElement.id)

        if (!currentVideo) return

        currentVideo.pause()


    }

    window.addEventListener('touchstart', function(e) {
        if (e.target.closest('.vjs-volume-panel')) {
            allowedSound = !!e.target.closest('.vjs-vol-0');
        }
    })
    window.addEventListener('click', function(e) {

        if (e.target.closest('.vjs-volume-panel')) {

            allowedSound = !!e.target.closest('.vjs-vol-0');

        }
        // Скрытие/показ тегов на видео
        if (e.target.closest('.tags-item-videos__toggler')) {
            e.preventDefault()

            const videoTagsToggler = e.target.closest('.tags-item-videos__toggler')

            const tagsList = videoTagsToggler.closest('.info-item-videos__tags')
            const visibleTagsCount = Number(tagsList.dataset.visibleCount)
            const tags = document.querySelectorAll('.tags-item-videos__item_hidden')

            for (let index = 0; index < tags.length; index++) {
                const tag = tags[index]
                tag.classList.toggle('hide')
            }
        }

        // Кнопка Play. Логика остановки видео, которое воспроизводилось до нажатия
        if (e.target.closest('.vjs-play-control')) {
            const currentVideo = e.target.closest('.video-js')

            const videos = document.querySelectorAll('.video-js.vjs-has-started')
            for (let index = 0; index < videos.length; index++) {
                const video = videos[index]

                if (currentVideo.isEqualNode(video)) continue



                video.querySelector('video').pause()
                // video.querySelector('video').currentTime = 0
                // video.querySelector('video').src = ""


                video.classList.remove('vjs-has-started')
            }
        }

        // Открытие выпадающего списка по клику на кнопку Share
        if (e.target.closest('.actions-item-videos__button')) {
            const shareButton = e.target.closest('.actions-item-videos__button')
            shareButton.nextElementSibling.classList.toggle('active')
        }


        if (e.target.closest('.actions-item-videos__link_red')) {
            e.target.closest('.actions-item-videos__list').classList.remove('active')
        }

        if (
            !e.target.closest('.bottom-item-videos__actions')
            && document.querySelector('.actions-item-videos__list.active')
        ) {
            document.querySelector('.actions-item-videos__list.active').classList.remove('active')
        }





        if (e.target.closest('.description-item-videos__more')) {
            const moreButton = e.target.closest('.description-item-videos__more')
            moreButton.previousElementSibling.classList.toggle('full')
        }

        if (e.target.closest('.quality-item-videos__button')) {
            const button = e.target.closest('.quality-item-videos__button')
            const itemVideo = e.target.closest('.item-videos')

            let quality = ''


            button.classList.remove('active')
            // Переключаем качество
            if (button.classList.contains('hd')) {
                quality = 'sd'

                allowedHd = false
                button.closest('.videos-model__items').classList.remove('hd')
                button.parentElement.querySelector('.quality-item-videos__button.sd').classList.add('active')
            } else {
                quality = 'hd'
                allowedHd = true
                button.closest('.videos-model__items').classList.add('hd')
                button.parentElement.querySelector('.quality-item-videos__button.hd').classList.add('active')
            }

            const downloadButton = itemVideo.querySelector('.item-videos__download')
            const video = itemVideo.querySelector('video')
            const srcValue = video.querySelector('source[data-video-quality="' + quality + '"]').src

            downloadButton.href = srcValue


            video.src = srcValue
            video.currentTime = 0

            video.play()
        }

        if (e.target.closest('.actions-item-videos__link_red')) {
            const button = e.target.closest('.actions-item-videos__link_red')

            const currentVideoId = button.closest('.item-videos').querySelector('.video-js').id

            const reportHiddenInput = document.querySelector('.report input[type="hidden"]')
            reportHiddenInput.value = currentVideoId
        }
    })

    // Получаем нужный элемент

    var Visible = function (target) {
        const offset = 190
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





    function playOnScroll() {
        // Рассчет положения в окне браузера и воспроизведение видео по клику
        const videoItems = document.querySelectorAll('.video-js')
        for (let index = 0; index < videoItems.length; index++) {
            const videoItem = videoItems[index];

            if (Visible(videoItem)) {

                if (videoItem.classList.contains('vjs-playing')) break;

                resetCurrentVideo()

                if (allowedHd && !videoItem.classList.contains('hd')) {
                    const sourceTag = videoItem.querySelector('video').querySelector('source[data-video-quality="hd"]')

                    videoItem.querySelector('.item-videos__download').href = sourceTag.src
                    videoItem.classList.add('hd')
                    const hdButton = videoItem.querySelector('.quality-item-videos__button.hd')
                    const sdButton = videoItem.querySelector('.quality-item-videos__button.sd')

                    if (!hdButton.classList.contains('active')) {
                        videoItem.querySelector('.quality-item-videos__button.hd').classList.add('active')
                    }

                    if (sdButton.classList.contains('active')) {
                        videoItem.querySelector('.quality-item-videos__button.sd').classList.remove('active')
                    }



                    videoItem.querySelector('video').currentTime = 0
                    videoItem.querySelector('video').src = sourceTag.src

                } else if (!allowedHd && videoItem.classList.contains('hd')) {
                    const sourceTag = videoItem.querySelector('video').querySelector('source[data-video-quality="sd"]')

                    videoItem.querySelector('.item-videos__download').href = sourceTag.src
                    videoItem.classList.remove('hd')

                    const hdButton = videoItem.querySelector('.quality-item-videos__button.hd')
                    const sdButton = videoItem.querySelector('.quality-item-videos__button.sd')

                    if (!sdButton.classList.contains('active')) {
                        videoItem.querySelector('.quality-item-videos__button.sd').classList.add('active')
                    }

                    if (hdButton.classList.contains('active')) {
                        videoItem.querySelector('.quality-item-videos__button.hd').classList.remove('active')
                    }

                    videoItem.querySelector('video').currentTime = 0
                    videoItem.querySelector('video').src = sourceTag.src
                }





                if (allowedSound) {
                    if (players.has(videoItem.id)) {
                        const player = players.get(videoItem.id)
                        player.play()
                        player.volume(1);
                        player.muted( false );
                    } else {
                        videojs(videoItem.id).ready(function(){
                            window.customPlayer = this;

                            customPlayer.volume(1);
                            customPlayer.muted( false );
                            customPlayer.play();

                            players.set(videoItem.id, customPlayer)
                        });
                    }

                } else {
                    if (players.has(videoItem.id)) {
                        const player = players.get(videoItem.id)
                        player.play()
                        player.volume(0);
                        player.muted( true );

                    } else {
                        videojs(videoItem.id).ready(function(){
                            window.customPlayer = this;

                            customPlayer.volume(0);
                            customPlayer.muted( true );
                            customPlayer.play();

                            players.set(videoItem.id, customPlayer)
                        });
                    }


                }

                if (videoItem instanceof HTMLMediaElement) return


                if (!videoItem.classList.contains('load')) {
                    videoItem.classList.add('load')

                    if (!allowedHd) {
                        const sourceTag = videoItem.querySelector('video').querySelector('source[data-video-quality="sd"]')

                        videoItem.querySelector('.item-videos__download').href = sourceTag.src
                        videoItem.classList.remove('hd')

                        videoItem.querySelector('.quality-item-videos__button.sd').classList.add('active')
                    }
                }

                break;
            }
        }
    }

    if (document.querySelectorAll('.video-js').length > 0) {
        // Запускаем функцию при прокрутке страницы
        document.body.addEventListener('scroll', debounce(function() {
            appendActionsToVideo()
            playOnScroll()

        }, 50));
        setTimeout(function() {
            playOnScroll();
        }, 300);
    }





    // Эта функция добавляем блок с дополнительными опциями
    // (кнопка скачать, просмотры, качества, ссылка на стрим канал) в обертку
    function appendActionsToVideo() {
        const actions = document.querySelectorAll('.videos__item.init .item-videos__block')

        if (actions.length > 0) {
            for (let index = 0; index < actions.length; index++) {
                const actionBlock = actions[index]
                actionBlock.closest('.videos__item.init').classList.remove('init')
                if (actionBlock.parentElement.querySelector('.video-js')) {
                    actionBlock.parentElement.querySelector('.video-js').appendChild(actionBlock)
                }

            }
        }
    }
    appendActionsToVideo()

})

setTimeout(() => {
    const el = document.createElement('div')
    el.className = 'videos__item init item-videos item-videos_vertical'
    el.innerHTML = `
                                <div class="item-videos__main">
                                    <div class="item-videos__backdrop">
                                        <img loading="lazy" src="https://tiktits.com/assets/uploads/2023-03-20_9-07-36-1665679008_1.webp" alt="">
                                    </div>
                                    <div class="item-videos__block">
                                        <div class="item-videos__views">
                                            <svg>
                                                <use xlink:href="assets/images/icons/icons.svg#eye"></use>
                                            </svg>
                                            <span>435</span>
                                        </div>
                                        <a download href="https://tiktits.com/assets/uploads/2023-03-20_9-07-36-1665679008_1_720.mp4" class="item-videos__download">
                                            <svg>
                                                <use xlink:href="assets/images/icons/icons-2.svg#download"></use>
                                            </svg>
                                        </a>
                                        <div class="item-videos__quality quality-item-videos">
                                            <div class="quality-item-videos__button sd">
                                                <svg>
                                                    <use xlink:href="assets/images/icons/icons-2.svg#button-sd"></use>
                                                </svg>
                                            </div>
                                            <div class="quality-item-videos__button hd">
                                                <svg>
                                                    <use xlink:href="assets/images/icons/icons-2.svg#button-hd"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <a href="" class="item-videos__live live-block">
                                            <div class="live-block__body">
                                                <div class="live-block__image">
                                                    <img src="assets/images/01.webp" alt="">
                                                </div>
                                                <div class="live-block__label">
                                                    <img src="assets/images/icons/live.svg" alt="">
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <video loop playsinline
                                           muted
                                           id="video-10"
                                           class="video-js"
                                           controls
                                           preload="auto"
                                           poster="assets/video/video6.webp"
                                    >
                                        <source src="assets/video/video6_720.mp4" data-video-quality="sd" type="video/mp4">
                                        <source src="assets/video/video6_1080.mp4" data-video-quality="hd" type="video/mp4">
                                        <p class="vjs-no-js">
                                            To view this video please enable JavaScript, and consider upgrading to a
                                            web browser that
                                            <a href="https://videojs.com/html5-video-support/" target="_blank"
                                            >supports HTML5 video</a>
                                        </p>
                                    </video>

                                    <div class="item-videos__info info-item-videos">
                                        <div class="info-item-videos__body">
                                            <div class="info-item-videos__avatar">
                                                <picture>
                                                    <source srcset="assets/images/users/01.webp" type="image/webp">
                                                    <source srcset="assets/images/users/01.jpg" type="image/jpeg">
                                                    <img src="assets/images/users/01.jpg">
                                                </picture>
                                                <div class="info-item-videos__plus"><span></span></div>
                                            </div>
                                            <div class="info-item-videos__content">
                                                <div class="info-item-videos__date">12.12.2022</div>
                                                <div class="info-item-videos__name">
                                                    <span>asian_sexdoll</span>
                                                    <div class="info-item-videos__verified">
                                                        <svg>
                                                            <use xlink:href="assets/images/icons/icons.svg#check-circle"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="info-item-videos__description description-item-videos">
                                            <div class="description-item-videos__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eveniet possimus quod. Dolore ducimus eligendi eveniet facilis iste iure molestiae quasi reiciendis ullam vero.</div>
                                            <span class="description-item-videos__more">More</span>
                                        </div>
                                        <ul class="info-item-videos__tags tags-item-videos">
                                            <li class="tags-item-videos__item">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item tags-item-videos__item_hidden hide">
                                                <a href="">Tag 1</a>
                                            </li>
                                            <li class="tags-item-videos__item">
                                                <a href="" class="tags-item-videos__toggler">...</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div class="item-videos__bottom bottom-item-videos">
                                    <div class="bottom-item-videos__body">
                                        <div class="bottom-item-videos__likes">
                                            <svg>
                                                <use xlink:href="assets/images/icons/icons-2.svg#favorite"></use>
                                            </svg>
                                            <span>123</span>
                                        </div>
                                        <div class="bottom-item-videos__add">
                                            <svg>
                                                <use xlink:href="assets/images/icons/icons-2.svg#plus"></use>
                                            </svg>
                                            <span>Add</span>
                                        </div>
                                        <div class="bottom-item-videos__actions actions-item-videos">
                                            <div class="actions-item-videos__button">
                                                <svg>
                                                    <use xlink:href="assets/images/icons/icons-2.svg#share"></use>
                                                </svg>
                                            </div>
                                            <ul class="actions-item-videos__list">
                                                <li>
                                                    <a href="" class="actions-item-videos__link">
                                                        <svg>
                                                            <use xlink:href="assets/images/icons/icons.svg#reddit"></use>
                                                        </svg>
                                                        <span>Reddit</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="" class="actions-item-videos__link">
                                                        <svg>
                                                            <use xlink:href="assets/images/icons/icons.svg#twitter"></use>
                                                        </svg>
                                                        <span>Twitter</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="" class="actions-item-videos__link">
                                                        <svg>
                                                            <use xlink:href="assets/images/icons/icons-2.svg#discord"></use>
                                                        </svg>
                                                        <span>Discord</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="" data-modal-link="report-step-1" class="actions-item-videos__link actions-item-videos__link_red">
                                                        <svg>
                                                            <use xlink:href="assets/images/icons/icons-2.svg#warning"></use>
                                                        </svg>
                                                        <span>Report</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
    `
    document.querySelector('.videos-model__items_list').appendChild(el)
}, 2000)
