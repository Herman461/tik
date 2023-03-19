document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('.item-videos_full.video-js')) {
        const fullVideo = document.querySelector('.item-videos_full.video-js')
        const fullVideoItem = videojs(fullVideo.id);
        fullVideoItem.play()
    }

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


    const videoItems = document.querySelectorAll('.video-js');

    if (videoItems.length > 0) {
        document.body.addEventListener('scroll', debounce(playOnScroll, 40));
        function playOnScroll() {
            for (let index = 0; index < videoItems.length; index++) {
                const videoItem = videoItems[index];
                const videoItemHeight = videoItem.offsetHeight;
                const videoItemOffset = offset(videoItem).top;
                const playStart = 1;

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

})
