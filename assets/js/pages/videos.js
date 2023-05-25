



document.addEventListener('DOMContentLoaded', function() {
    const players = new Map()
    let allowedSound = false
    let allowedHd = false

    // let currentFullscreenVideo = null
    // let nextFullscreenVideo = null
    //
    document.addEventListener('fullscreenchange', onFullScreenChange, false);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange, false);
    document.addEventListener('mozfullscreenchange', onFullScreenChange, false);

    function onFullScreenChange() {
        const fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;

        if (!fullscreenElement) {
            document.body.classList.remove('fullscreen')

            if (document.querySelector('.fullscreen-current')) {
                document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
            }
            if (document.querySelector('.fullscreen-next')) {
                document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
            }
            if (document.querySelector('.fullscreen-prev')) {
                document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
            }
        }

    }
    // document.querySelector('.page').addEventListener('click', function(e) {
    //     document.querySelector('.page').requestFullscreen()
    // })
    // if (document.body.classList.contains('fullscreen')) {
    //     document.body.classList.remove('fullscreen')
    // } else {
    //     document.body.classList.add('fullscreen')
    let nextFullscreenVideo = null
    let prevFullscreenVideo = null
    let currentFullscreenVideo = null


    function activateFullscreenMode(e) {
        if  (e.target.closest('body') && e.target.closest('.fullscreen-control-item-videos__button_open')) {
            if (document.body.classList.contains('fullscreen')) return

            document.body.requestFullscreen()

            if (document.querySelector('.fullscreen-current')) {
                document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
            }
            if (document.querySelector('.fullscreen-next')) {
                document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
            }
            if (document.querySelector('.fullscreen-prev')) {
                document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
            }

            currentFullscreenVideo = e.target.closest('.item-videos')

            currentFullscreenVideo.classList.add('fullscreen-current')

            if (currentFullscreenVideo.classList.contains('item-videos_main')) {
                nextFullscreenVideo = document.querySelector('.videos-model .item-videos')

                nextFullscreenVideo.classList.add('fullscreen-next')
            } else {
                nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
                prevFullscreenVideo = currentFullscreenVideo.previousElementSibling

                if (nextFullscreenVideo) {
                    nextFullscreenVideo.classList.add('fullscreen-next')
                }

                if (prevFullscreenVideo) {
                    prevFullscreenVideo.classList.add('fullscreen-prev')
                }
            }
            document.body.classList.add('fullscreen')
        }
    }
    function deactivateFullscreenMode(e) {
        if (e.target.closest('body') && e.target.closest('.fullscreen-control-item-videos__button_opened')) {
            if (!document.body.classList.contains('fullscreen')) return

            document.exitFullscreen()
            document.body.classList.remove('fullscreen')

            if (document.querySelector('.fullscreen-current')) {
                document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
            }
            if (document.querySelector('.fullscreen-next')) {
                document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
            }
            if (document.querySelector('.fullscreen-prev')) {
                document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
            }
        }
    }
    window.addEventListener('click', activateFullscreenMode)
    window.addEventListener('touchend', activateFullscreenMode)

    window.addEventListener('click', deactivateFullscreenMode)
    window.addEventListener('touchend', deactivateFullscreenMode)

    window.addEventListener('swiped-up', debounce(function() {
        if (!document.body.classList.contains('fullscreen')) return
        setNextFullscreenVideo()

    }, 50))

    window.addEventListener('swiped-down', debounce(function() {
        if (!document.body.classList.contains('fullscreen')) return

        setPrevFullscreenVideo()
    }, 50))

    let lockSwapVideo = false

    function setNextFullscreenVideo() {

        if (!nextFullscreenVideo) return

        if (lockSwapVideo) return

        if (prevFullscreenVideo) {
            prevFullscreenVideo.classList.remove('fullscreen-prev')
        }

        currentFullscreenVideo.classList.remove('fullscreen-current')
        nextFullscreenVideo.classList.remove('fullscreen-next')

        let tempCurrentVideo = currentFullscreenVideo
        setTimeout(function() {
            tempCurrentVideo.querySelector('video').pause()
        }, 150)

        prevFullscreenVideo = currentFullscreenVideo
        currentFullscreenVideo = nextFullscreenVideo
        nextFullscreenVideo = currentFullscreenVideo.nextElementSibling

        currentFullscreenVideo.querySelector('video').play()


        if (nextFullscreenVideo && !nextFullscreenVideo.classList.contains('item-videos')) {
            nextFullscreenVideo = null
        }

        prevFullscreenVideo.classList.add('fullscreen-prev')
        currentFullscreenVideo.classList.add('fullscreen-current')

        if (nextFullscreenVideo) {
            nextFullscreenVideo.classList.add('fullscreen-next')
        }

        lockSwapVideo = true
        setTimeout(function() {
            lockSwapVideo = false
        }, 400)
    }
    function setPrevFullscreenVideo() {
        if (!prevFullscreenVideo) return

        if (currentFullscreenVideo.classList.contains('.item-videos_main')) return

        if (lockSwapVideo) return

        if (nextFullscreenVideo) {
            nextFullscreenVideo.classList.remove('fullscreen-next')
        }

        currentFullscreenVideo.classList.remove('fullscreen-current')
        prevFullscreenVideo.classList.remove('fullscreen-prev')

        let tempCurrentVideo = currentFullscreenVideo
        setTimeout(function() {
            tempCurrentVideo.querySelector('video').pause()
        }, 150)

        nextFullscreenVideo = currentFullscreenVideo
        currentFullscreenVideo = prevFullscreenVideo
        prevFullscreenVideo = currentFullscreenVideo.previousElementSibling

        currentFullscreenVideo.querySelector('video').play()

        if (!prevFullscreenVideo) {
            prevFullscreenVideo = document.querySelector('.item-videos_main')
        }


        if (prevFullscreenVideo && !prevFullscreenVideo.classList.contains('item-videos')) {
            prevFullscreenVideo = null
        }


        if (prevFullscreenVideo) {
            prevFullscreenVideo.classList.add('fullscreen-prev')
        }

        currentFullscreenVideo.classList.add('fullscreen-current')
        nextFullscreenVideo.classList.add('fullscreen-next')

        lockSwapVideo = true
        setTimeout(function() {
            lockSwapVideo = false
        }, 400)
    }
    document.body.addEventListener('wheel', debounce(function(e) {

        var y = e.deltaY || e.detail || e.wheelDelta

        if (y > 0) {
            setNextFullscreenVideo()
        } else {
            setPrevFullscreenVideo()
        }
    }, 50))


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


                // window.addEventListener('click', () => {
                //     this.requestFullscreen()
                // })
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

                document.querySelector('.videos-model__items_list').classList.remove('hd')
                if (document.querySelector('.base-video')) {
                    document.querySelector('.base-video .item-videos').classList.remove('hd')
                }

                button.parentElement.querySelector('.quality-item-videos__button.sd').classList.add('active')
            } else {
                quality = 'hd'
                allowedHd = true

                document.querySelector('.videos-model__items_list').classList.add('hd')
                if (document.querySelector('.base-video')) {
                    document.querySelector('.base-video .item-videos').classList.add('hd')
                }

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
