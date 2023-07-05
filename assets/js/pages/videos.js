



document.addEventListener('DOMContentLoaded', function() {
    const players = new Map()
    let allowedSound = false
    let allowedHd = false
    let globalPlayer = null
    function initVideoOnScroll(videoItem) {
        if (videoItem.classList.contains('lazy')) {
            const currentWrapper = videoItem.closest('.item-videos')
            currentWrapper.classList.remove('lazy')
            videoItem.classList.remove('lazy')
            videojs(
                videoItem.id,
                {
                    preload: 'none',
                    inactivityTimeout: 0,
                    userActions: {
                        doubleClick: onVideoDoubleClick
                    }
                }
            ).ready(function () {
                window.customPlayer = this;
                players.set(videoItem.id, customPlayer)

                customPlayer.pause()
                // window.addEventListener('click', () => {
                //     this.requestFullscreen()
                // })


                const currentBlock = currentWrapper.querySelector('.item-videos__block')

                currentWrapper.querySelector('.video-js').appendChild(currentBlock)

                currentWrapper.querySelector('.item-videos__live').hidden = false
                currentWrapper.querySelector('.item-videos__live').classList.remove('vjs-hidden')
                currentWrapper.querySelector('.item-videos__download').hidden = false
                currentWrapper.querySelector('.item-videos__download').classList.remove('vjs-hidden')

            });
        }
    }

    function onVideoDoubleClick(event) {
        this.pause();
    }


    // Воспроизведение главного видео после загрузки страницы
    if (document.querySelector('.item-videos_main.video-js')) {
        const mainVideo = document.querySelector('.item-videos_main.video-js')
        const mainVideoItem = players.get(mainVideo.id);

        mainVideoItem.play()
        globalPlayer = mainVideoItem
    }

    // Сброс воспроизведения текущего видео
    function resetCurrentVideo() {

        // const currentVideoElement = document.querySelector('.video-js.vjs-playing')
        // console.log(currentVideoElement)
        // if (!currentVideoElement) return
        //
        // if (!currentVideoElement.id) return
        //
        // const currentVideo = players.get(currentVideoElement.id)

        if (!globalPlayer) return

        console.log(globalPlayer)
        globalPlayer.pause()


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
                initVideoOnScroll(videoItem)


                if (videoItem.classList.contains('vjs-playing')) break;

                resetCurrentVideo()

                if (allowedHd && !videoItem.classList.contains('hd')) {
                    const sourceTag = videoItem.querySelector('source[data-video-quality="hd"]')

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



                    videoItem.currentTime = 0
                    videoItem.src = sourceTag.src

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
                        globalPlayer = player
                        player.play()
                        player.volume(1);
                        player.muted( false );
                    } else {
                        videojs(videoItem.id).ready(function(){
                            window.customPlayer = this;

                            customPlayer.volume(1);
                            customPlayer.muted( false );
                            customPlayer.play();

                            globalPlayer = player
                            players.set(videoItem.id, customPlayer)

                        });
                    }

                } else {
                    if (players.has(videoItem.id)) {
                        const player = players.get(videoItem.id)
                        player.play()
                        player.volume(0);
                        player.muted( true );

                        globalPlayer = player

                    } else {
                        videojs(videoItem.id).ready(function(){
                            window.customPlayer = this;

                            customPlayer.volume(0);
                            customPlayer.muted( true );
                            customPlayer.play();
                            globalPlayer = customPlayer
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

        document.querySelector('.videos-model__items_list').addEventListener('scroll', debounce(function() {
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



    //============================
    let nextFullscreenVideo = null
    let prevFullscreenVideo = null
    let currentFullscreenVideo = null

    document.body.classList.add('default')
    function cancelFullScreen() {
        var el = document;
        var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
        if (requestMethod) { // cancel full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }


    function requestFullScreen(el) {
        // Supports most browsers and their versions.
        var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
        return false
    }

    function toggleFullScreen(el) {
        if (!el) {
            el = document.body; // Make the body go full screen.
        }
        var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

        if (isInFullScreen) {
            cancelFullScreen();

            nextFullscreenVideo.style.transform = 'none'
            currentFullscreenVideo.style.transform = 'none'
            prevFullscreenVideo.style.transform = 'none'
        } else {
            requestFullScreen(el);
        }
        return false;
    }
    document.addEventListener('fullscreenchange', onFullScreenChange, false)
    document.addEventListener('webkitfullscreenchange', onFullScreenChange, false)
    document.addEventListener('mozfullscreenchange', onFullScreenChange, false)

    function onFullScreenChange() {
        var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);


        if (!isInFullScreen) {
            document.body.classList.remove('fullscreen')
            document.body.classList.add('default')
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



    function activateFullscreenMode(e) {
        if  (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_open')) {
            if (document.body.classList.contains('fullscreen')) return

            toggleFullScreen()

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



            currentFullscreenVideo.style.top = '0'
            currentFullscreenVideo.style.transform = 'translate(0, 0)'

            if (currentFullscreenVideo.classList.contains('item-videos_main')) {
                nextFullscreenVideo = document.querySelector('.videos-model .item-videos')

                nextFullscreenVideo.classList.add('fullscreen-next')

                nextFullscreenVideo.style.top = '100%'
                nextFullscreenVideo.style.transform = 'translate(0, 0)'
            } else {
                nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
                prevFullscreenVideo = currentFullscreenVideo.previousElementSibling

                if (nextFullscreenVideo) {
                    nextFullscreenVideo.classList.add('fullscreen-next')

                    nextFullscreenVideo.style.top = '100%'
                    nextFullscreenVideo.style.transform = 'translate(0, 0)'
                }

                if (prevFullscreenVideo) {
                    prevFullscreenVideo.classList.add('fullscreen-prev')

                    prevFullscreenVideo.style.top = '-100%'
                    prevFullscreenVideo.style.transform = 'translate(0, -100%)'
                }
            }
            document.body.classList.add('fullscreen')
            document.body.classList.remove('default')
        }
    }
    function deactivateFullscreenMode(e) {
        if (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_opened')) {
            if (!document.body.classList.contains('fullscreen')) return

            toggleFullScreen()
            document.body.classList.remove('fullscreen')
            document.body.classList.add('default')
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


    window.addEventListener('click', activateFullscreenMode, true)
    window.addEventListener('click', deactivateFullscreenMode)



    window.addEventListener('swiped-up', debounce(function() {

        if (!document.body.classList.contains('fullscreen')) return

        setTimeout(function() {
            setNextFullscreenVideo()
        }, 100)


    }, 100))

    window.addEventListener('swiped-down', debounce(function() {

        if (!document.body.classList.contains('fullscreen')) return

        setTimeout(function() {
            setPrevFullscreenVideo()
        }, 100)

    }, 100))

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

        if (tempCurrentVideo.querySelector('video')) {
            tempCurrentVideo.querySelector('video').pause()
        }


        setTimeout(function() {
            if (tempCurrentVideo.querySelector('video')) {
                tempCurrentVideo.querySelector('video').currentTime = 0
            }

        }, 400)


        prevFullscreenVideo = currentFullscreenVideo
        currentFullscreenVideo = nextFullscreenVideo
        nextFullscreenVideo = currentFullscreenVideo.nextElementSibling


        setTimeout(function() {
            if (currentFullscreenVideo.querySelector('video')) {
                currentFullscreenVideo.querySelector('video').play()
            }

        }, 400)



        if (nextFullscreenVideo && !nextFullscreenVideo.hasAttribute('data-fullscreen-item')) {
            nextFullscreenVideo = null
        }

        prevFullscreenVideo.classList.add('fullscreen-prev')
        currentFullscreenVideo.classList.add('fullscreen-current')

        prevFullscreenVideo.style.top = '-100%'
        prevFullscreenVideo.style.transform = 'translate(0, -100%)'

        currentFullscreenVideo.style.top = '0'
        currentFullscreenVideo.style.transform = 'translate(0, 0)'

        if (nextFullscreenVideo) {
            nextFullscreenVideo.classList.add('fullscreen-next')

            nextFullscreenVideo.style.top = '100%'
            nextFullscreenVideo.style.transform = 'translate(0, 100%)'

        }

        if (!currentFullscreenVideo.classList.contains('videos__banner')) {
            initVideoOnScroll(currentFullscreenVideo.querySelector('.video-js'))
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
            if (tempCurrentVideo.querySelector('video')) {
                tempCurrentVideo.querySelector('video').pause()
            }

        }, 400)

        nextFullscreenVideo = currentFullscreenVideo
        currentFullscreenVideo = prevFullscreenVideo
        prevFullscreenVideo = currentFullscreenVideo.previousElementSibling

        setTimeout(function() {
            if (currentFullscreenVideo.querySelector('video')) {
                currentFullscreenVideo.querySelector('video').play()
            }

        }, 400)

        if (prevFullscreenVideo) {
            prevFullscreenVideo.classList.add('fullscreen-prev')
        }

        currentFullscreenVideo.classList.add('fullscreen-current')

        nextFullscreenVideo.style.top = '100%'
        nextFullscreenVideo.style.transform = 'translate(0, 100%)'

        currentFullscreenVideo.style.top = '0'
        currentFullscreenVideo.style.transform = 'translate(0, 0)'

        if (!prevFullscreenVideo) {
            prevFullscreenVideo = document.querySelector('.item-videos_main')

            prevFullscreenVideo.style.top = '-100%'
            prevFullscreenVideo.style.transform = 'translate(0, -100%)'
        }


        if (prevFullscreenVideo && !prevFullscreenVideo.hasAttribute('data-fullscreen-item')) {
            prevFullscreenVideo = null
        }


        if (prevFullscreenVideo) {
            prevFullscreenVideo.classList.add('fullscreen-prev')
        }

        currentFullscreenVideo.classList.add('fullscreen-current')
        nextFullscreenVideo.classList.add('fullscreen-next')

        if (!currentFullscreenVideo.classList.contains('videos__banner')) {
            initVideoOnScroll(currentFullscreenVideo.querySelector('.video-js'))
        }

        lockSwapVideo = true
        setTimeout(function() {
            lockSwapVideo = false
        }, 400)
    }
    document.body.addEventListener('wheel', debounce(function(e) {

        var y = e.deltaY || e.detail || e.wheelDelta

        if (y > 0) {
            setTimeout(function() {
                if (document.body.classList.contains('fullscreen')) {
                    setNextFullscreenVideo()
                }

            }, 100)

        } else {
            setTimeout(function() {
                if (document.body.classList.contains('fullscreen')) {
                    setPrevFullscreenVideo()
                }

            }, 100)

        }
    }, 100))
})

window.addEventListener('click', async function(e) {
    if (e.target.closest('.item-videos__download')) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://via.placeholder.com/150', true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.target = '_blank';
            tag.download = 'sample.png';
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        };
        xhr.onerror = err => {
            alert('Failed to download picture');
        };
        xhr.send();
    }





})
