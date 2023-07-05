document.addEventListener('DOMContentLoaded', function() {

    // function toggleFullscreen() {
    //     // const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
    //     //     (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    //     //     (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    //     //     (document.msFullscreenElement && document.msFullscreenElement !== null)
    //     //
    //     // const docElm = document.documentElement
    //     //
    //     // if (!isInFullScreen) {
    //     //
    //     //     if (docElm.webkitRequestFullscreen) {
    //     //         docElm.webkitEnterFullscreen()
    //     //     } else if (docElm.mozRequestFullScreen) {
    //     //         docElm.mozRequestFullScreen()
    //     //     } else if (docElm.webkitRequestFullscreen) {
    //     //         docElm.webkitRequestFullscreen()
    //     //     } else if (docElm.msRequestFullscreen) {
    //     //         docElm.msRequestFullscreen()
    //     //     } else {
    //     //         if (docElm.requestFullscreen) {
    //     //             docElm.requestFullscreen()
    //     //         }
    //     //     }
    //     // } else {
    //     //
    //     //     if (document.webkitExitFullscreen) {
    //     //         document.webkitExitFullscreen()
    //     //     } else if (document.webkitExitFullscreen) {
    //     //         document.webkitExitFullscreen()
    //     //     } else if (document.mozCancelFullScreen) {
    //     //         document.mozCancelFullScreen()
    //     //     } else if (document.msExitFullscreen) {
    //     //         document.msExitFullscreen()
    //     //     } else {
    //     //         if (document.exitFullscreen) {
    //     //             document.exitFullscreen()
    //     //         }
    //     //     }
    //     //
    //     // }
    // }
    // window.addEventListener('click', activateFullscreenMode)
    // window.addEventListener('click', deactivateFullscreenMode)
    //
    //
    //
    // window.addEventListener('swiped-up', debounce(function() {
    //
    //     if (!document.body.classList.contains('fullscreen')) return
    //
    //     setTimeout(function() {
    //         setNextFullscreenVideo()
    //     }, 100)
    //
    //
    // }, 100))
    //
    // window.addEventListener('swiped-down', debounce(function() {
    //
    //     if (!document.body.classList.contains('fullscreen')) return
    //
    //     setTimeout(function() {
    //         setPrevFullscreenVideo()
    //     }, 100)
    //
    // }, 100))
    //
    // let lockSwapVideo = false
    //
    // function setNextFullscreenVideo() {
    //
    //     if (!nextFullscreenVideo) return
    //
    //     if (lockSwapVideo) return
    //
    //     if (prevFullscreenVideo) {
    //         prevFullscreenVideo.classList.remove('fullscreen-prev')
    //     }
    //
    //     currentFullscreenVideo.classList.remove('fullscreen-current')
    //     nextFullscreenVideo.classList.remove('fullscreen-next')
    //
    //     let tempCurrentVideo = currentFullscreenVideo
    //
    //     if (tempCurrentVideo.querySelector('video')) {
    //         tempCurrentVideo.querySelector('video').pause()
    //     }
    //
    //
    //     setTimeout(function() {
    //         if (tempCurrentVideo.querySelector('video')) {
    //             tempCurrentVideo.querySelector('video').currentTime = 0
    //         }
    //
    //     }, 400)
    //
    //
    //     prevFullscreenVideo = currentFullscreenVideo
    //     currentFullscreenVideo = nextFullscreenVideo
    //     nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
    //
    //
    //     setTimeout(function() {
    //         if (currentFullscreenVideo.querySelector('video')) {
    //             currentFullscreenVideo.querySelector('video').play()
    //         }
    //
    //     }, 400)
    //
    //
    //
    //     if (nextFullscreenVideo && !nextFullscreenVideo.hasAttribute('data-fullscreen-item')) {
    //         nextFullscreenVideo = null
    //     }
    //
    //     prevFullscreenVideo.classList.add('fullscreen-prev')
    //     currentFullscreenVideo.classList.add('fullscreen-current')
    //
    //     prevFullscreenVideo.style.top = '-100%'
    //     prevFullscreenVideo.style.transform = 'translate(0, -100%)'
    //
    //     currentFullscreenVideo.style.top = '0'
    //     currentFullscreenVideo.style.transform = 'translate(0, 0)'
    //
    //     if (nextFullscreenVideo) {
    //         nextFullscreenVideo.classList.add('fullscreen-next')
    //
    //         nextFullscreenVideo.style.top = '100%'
    //         nextFullscreenVideo.style.transform = 'translate(0, 100%)'
    //
    //     }
    //
    //     lockSwapVideo = true
    //     setTimeout(function() {
    //         lockSwapVideo = false
    //     }, 400)
    // }
    // function setPrevFullscreenVideo() {
    //     if (!prevFullscreenVideo) return
    //
    //     if (currentFullscreenVideo.classList.contains('.item-videos_main')) return
    //
    //     if (lockSwapVideo) return
    //
    //     if (nextFullscreenVideo) {
    //         nextFullscreenVideo.classList.remove('fullscreen-next')
    //     }
    //
    //     currentFullscreenVideo.classList.remove('fullscreen-current')
    //     prevFullscreenVideo.classList.remove('fullscreen-prev')
    //
    //     let tempCurrentVideo = currentFullscreenVideo
    //     setTimeout(function() {
    //         if (tempCurrentVideo.querySelector('video')) {
    //             tempCurrentVideo.querySelector('video').pause()
    //         }
    //
    //     }, 400)
    //
    //     nextFullscreenVideo = currentFullscreenVideo
    //     currentFullscreenVideo = prevFullscreenVideo
    //     prevFullscreenVideo = currentFullscreenVideo.previousElementSibling
    //
    //     setTimeout(function() {
    //         if (currentFullscreenVideo.querySelector('video')) {
    //             currentFullscreenVideo.querySelector('video').play()
    //         }
    //
    //     }, 400)
    //
    //     if (prevFullscreenVideo) {
    //         prevFullscreenVideo.classList.add('fullscreen-prev')
    //     }
    //
    //     currentFullscreenVideo.classList.add('fullscreen-current')
    //
    //     nextFullscreenVideo.style.top = '100%'
    //     nextFullscreenVideo.style.transform = 'translate(0, 100%)'
    //
    //     currentFullscreenVideo.style.top = '0'
    //     currentFullscreenVideo.style.transform = 'translate(0, 0)'
    //
    //     if (!prevFullscreenVideo) {
    //         prevFullscreenVideo = document.querySelector('.item-videos_main')
    //
    //         prevFullscreenVideo.style.top = '-100%'
    //         prevFullscreenVideo.style.transform = 'translate(0, -100%)'
    //     }
    //
    //
    //     if (prevFullscreenVideo && !prevFullscreenVideo.hasAttribute('data-fullscreen-item')) {
    //         prevFullscreenVideo = null
    //     }
    //
    //
    //     if (prevFullscreenVideo) {
    //         prevFullscreenVideo.classList.add('fullscreen-prev')
    //     }
    //
    //     currentFullscreenVideo.classList.add('fullscreen-current')
    //     nextFullscreenVideo.classList.add('fullscreen-next')
    //
    //     lockSwapVideo = true
    //     setTimeout(function() {
    //         lockSwapVideo = false
    //     }, 400)
    // }
    // document.body.addEventListener('wheel', debounce(function(e) {
    //
    //     var y = e.deltaY || e.detail || e.wheelDelta
    //
    //     if (y > 0) {
    //         setTimeout(function() {
    //             if (document.body.classList.contains('fullscreen')) {
    //                 setNextFullscreenVideo()
    //             }
    //
    //         }, 100)
    //
    //     } else {
    //         setTimeout(function() {
    //             if (document.body.classList.contains('fullscreen')) {
    //                 setPrevFullscreenVideo()
    //             }
    //
    //         }, 100)
    //
    //     }
    // }, 100))




})




