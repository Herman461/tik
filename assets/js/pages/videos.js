document.addEventListener('DOMContentLoaded', function() {

    // Воспроизведение главного видео после загрузки страницы
    if (document.querySelector('.item-videos_main.video-js')) {
        const mainVideo = document.querySelector('.item-videos_main.video-js')
        const mainVideoItem = videojs(mainVideo.id);
        mainVideoItem.play()
    }

    // Сброс воспроизведения текущего видео
    function resetCurrentVideo() {
        const currentVideoElement = document.querySelector('.video-js.vjs-has-started')
        if (!currentVideoElement) return

        const currentVideo = videojs(currentVideoElement.id)
        if (!currentVideo) return

        currentVideo.pause()
        currentVideoElement.querySelector('video').currentTime = 0
        currentVideoElement.querySelector('video').src = ""
        currentVideoElement.querySelector('video').removeAttribute('src')

        currentVideoElement.classList.remove('vjs-has-started')

    }

    window.addEventListener('click', function(e) {

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

                const videoEl = videojs(video.id)

                videoEl.pause()
                video.querySelector('video').currentTime = 0
                video.querySelector('video').src = ""
                video.querySelector('video').removeAttribute('src')

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


                button.parentElement.querySelector('.quality-item-videos__button.sd').classList.add('active')
            } else {
                quality = 'hd'
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

    // Рассчет положения в окне браузера и воспроизведение видео по клику
    const videoItems = document.querySelectorAll('.video-js');

    if (videoItems.length > 0) {
        document.body.addEventListener('scroll', debounce(playOnScroll, 10));
        function playOnScroll() {
            for (let index = 0; index < videoItems.length; index++) {
                const videoItem = videoItems[index];
                const videoItemHeight = videoItem.offsetHeight;
                const videoItemOffset = offset(videoItem).top;
                const playStart = 1.2;

                let videoItemPoint = window.innerHeight - videoItemHeight / playStart;
                if (videoItemHeight > window.innerHeight) {
                    videoItemPoint = window.innerHeight - window.innerHeight / playStart;
                }

                if (
                    pageYOffset > videoItemOffset - videoItemPoint &&
                    pageYOffset < videoItemOffset + videoItemHeight
                ) {
                    if (videoItem.classList.contains('vjs-has-started')) continue



                    resetCurrentVideo()


                    const baseVideo = videojs(videoItem.id);
                    baseVideo.play()
                    break;
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }
        setTimeout(() => {
            playOnScroll();
        }, 300);
    }

    const baseVideos = document.querySelectorAll('.video-js')

    function onVideoDoubleClick(event) {
        this.pause();
    }


    if (baseVideos.length > 0) {
        for (let index = 0; index < baseVideos.length; index++) {
            const video = baseVideos[index]
            videojs(video, {
                userActions: {
                    doubleClick: onVideoDoubleClick
                }
            });
        }
    }

    // Эта функция добавляем блок с дополнительными опциями
    // (кнопка скачать, просмотры, качества, ссылка на стрим канал) в обертку
    function appendActionsToVideo() {
        const actions = document.querySelectorAll('.item-videos__block')

        for (let index = 0; index < actions.length; index++) {
            const actionBlock = actions[index]
            actionBlock.parentElement.querySelector('.video-js').appendChild(actionBlock)
        }
    }
    appendActionsToVideo()
})
