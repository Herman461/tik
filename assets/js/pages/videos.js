



document.addEventListener('DOMContentLoaded', function() {
    const players = {}
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
                players[video.id] = customPlayer
            });
        }
    }

    // Воспроизведение главного видео после загрузки страницы
    if (document.querySelector('.item-videos_main.video-js')) {
        const mainVideo = document.querySelector('.item-videos_main.video-js')
        const mainVideoItem = players[mainVideo.id];
        mainVideoItem.play()
    }

    // Сброс воспроизведения текущего видео
    function resetCurrentVideo() {

        const currentVideoElement = document.querySelector('.video-js.vjs-playing')

        if (!currentVideoElement) return

        if (!currentVideoElement.id) return

        const currentVideo = players[currentVideoElement.id]

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

        // Открытия выпадающего списка по клику на кнопку Share
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
                button.parentElement.querySelector('.quality-item-videos__button.sd').classList.add('active')
            } else {
                quality = 'hd'
                allowedHd = true
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



                if (!videoItem.classList.contains('load')) {
                    videoItem.classList.add('load')
                    if (!allowedHd) {
                        const sourceTag = videoItem.querySelector('video').querySelector('source[data-video-quality="sd"]')

                        videoItem.querySelector('.item-videos__download').href = sourceTag.src
                        videoItem.classList.remove('hd')

                        videoItem.querySelector('.quality-item-videos__button.sd').classList.add('active')
                    }
                }

                if (allowedSound) {
                    if (players[videoItem.id]) {
                        const player = players[videoItem.id]
                        player.play()
                        player.volume(1);
                        player.muted( false );
                    } else {
                        videojs(videoItem.id).ready(function(){
                            window.customPlayer = this;

                            customPlayer.volume(1);
                            customPlayer.muted( false );
                            customPlayer.play();

                            players[videoItem.id] = customPlayer
                        });
                    }

                } else {
                    if (players[videoItem.id]) {
                        const player = players[videoItem.id]
                        player.play()
                        player.volume(0);
                        player.muted( true );

                    } else {
                        videojs(videoItem.id).ready(function(){
                            window.customPlayer = this;

                            customPlayer.volume(0);
                            customPlayer.muted( true );
                            customPlayer.play();

                            players[videoItem.id] = customPlayer
                        });
                    }


                }

                // videoItem.querySelector('video').play()



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
