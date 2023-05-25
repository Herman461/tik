document.addEventListener('DOMContentLoaded', function() {

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
})
