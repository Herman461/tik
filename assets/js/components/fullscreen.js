// // document.addEventListener('DOMContentLoaded', function() {
// //
// //     const videosList = document.querySelector('.videos-model__items_list')
// //     function cancelFullScreen() {
// //         var el = document;
// //         var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
// //         if (requestMethod) { // cancel full screen.
// //             requestMethod.call(el);
// //         } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
// //             var wscript = new ActiveXObject("WScript.Shell");
// //             if (wscript !== null) {
// //                 wscript.SendKeys("{F11}");
// //             }
// //         }
// //     }
// //
// //     function requestFullScreen(el) {
// //         // Supports most browsers and their versions.
// //         var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
// //
// //         if (requestMethod) { // Native full screen.
// //             requestMethod.call(el);
// //         } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
// //             var wscript = new ActiveXObject("WScript.Shell");
// //             if (wscript !== null) {
// //                 wscript.SendKeys("{F11}");
// //             }
// //         }
// //         return false
// //     }
// //
// //     function toggleFullScreen(el) {
// //         if (!el) {
// //             el = document.querySelector('.videos-model__items_list'); // Make the body go full screen.
// //         }
// //         var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);
// //
// //         if (isInFullScreen) {
// //             cancelFullScreen();
// //         } else {
// //             requestFullScreen(el);
// //         }
// //         return false;
// //     }
// //     document.addEventListener('fullscreenchange', onFullScreenChange, false)
// //     document.addEventListener('webkitfullscreenchange', onFullScreenChange, false)
// //     document.addEventListener('mozfullscreenchange', onFullScreenChange, false)
// //
// //     function onFullScreenChange() {
// //         var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);
// //
// //         if (document.body.classList.contains('fullscreen')) {
// //             const mainVideo = videosList.querySelector('.item-videos_main')
// //
// //             if (mainVideo) {
// //                 document.querySelector('.base-video__content').appendChild(mainVideo)
// //             }
// //         } else {
// //             const mainVideo = document.querySelector('.base-video .videos__item')
// //
// //             if (mainVideo) {
// //                 prependChild(videosList, mainVideo)
// //             }
// //         }
// //         document.body.classList.toggle('fullscreen')
// //
// //         if (!isInFullScreen) {
// //             document.body.classList.remove('fullscreen')
// //
// //             if (document.querySelector('.fullscreen-current')) {
// //                 document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
// //             }
// //             if (document.querySelector('.fullscreen-next')) {
// //                 document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
// //             }
// //             if (document.querySelector('.fullscreen-prev')) {
// //                 document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
// //             }
// //         }
// //
// //     }
// //
// //     let nextFullscreenVideo = null
// //     let prevFullscreenVideo = null
// //     let currentFullscreenVideo = null
// //
// //
// //     function activateFullscreenMode(e) {
// //
// //         if  (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_open')) {
// //             if (document.body.classList.contains('fullscreen')) return
// //
// //             toggleFullScreen()
// //
// //             if (document.querySelector('.fullscreen-current')) {
// //                 document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
// //             }
// //             if (document.querySelector('.fullscreen-next')) {
// //                 document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
// //             }
// //             if (document.querySelector('.fullscreen-prev')) {
// //                 document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
// //             }
// //
// //             currentFullscreenVideo = e.target.closest('.item-videos')
// //
// //             currentFullscreenVideo.classList.add('fullscreen-current')
// //
// //             if (currentFullscreenVideo.classList.contains('item-videos_main')) {
// //                 nextFullscreenVideo = document.querySelector('.videos-model .item-videos')
// //
// //                 nextFullscreenVideo.classList.add('fullscreen-next')
// //             } else {
// //                 nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
// //                 prevFullscreenVideo = currentFullscreenVideo.previousElementSibling
// //
// //                 if (nextFullscreenVideo) {
// //                     nextFullscreenVideo.classList.add('fullscreen-next')
// //                 }
// //
// //                 if (prevFullscreenVideo) {
// //                     prevFullscreenVideo.classList.add('fullscreen-prev')
// //                 }
// //             }
// //             document.body.classList.add('fullscreen')
// //         }
// //     }
// //     function deactivateFullscreenMode(e) {
// //         if (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_opened')) {
// //             if (!document.body.classList.contains('fullscreen')) return
// //
// //             toggleFullScreen()
// //             document.body.classList.remove('fullscreen')
// //
// //             if (document.querySelector('.fullscreen-current')) {
// //                 document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
// //             }
// //             if (document.querySelector('.fullscreen-next')) {
// //                 document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
// //             }
// //             if (document.querySelector('.fullscreen-prev')) {
// //                 document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
// //             }
// //         }
// //     }
// //     // function toggleFullscreen() {
// //     //     // const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
// //     //     //     (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
// //     //     //     (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
// //     //     //     (document.msFullscreenElement && document.msFullscreenElement !== null)
// //     //     //
// //     //     // const docElm = document.documentElement
// //     //     //
// //     //     // if (!isInFullScreen) {
// //     //     //
// //     //     //     if (docElm.webkitRequestFullscreen) {
// //     //     //         docElm.webkitEnterFullscreen()
// //     //     //     } else if (docElm.mozRequestFullScreen) {
// //     //     //         docElm.mozRequestFullScreen()
// //     //     //     } else if (docElm.webkitRequestFullscreen) {
// //     //     //         docElm.webkitRequestFullscreen()
// //     //     //     } else if (docElm.msRequestFullscreen) {
// //     //     //         docElm.msRequestFullscreen()
// //     //     //     } else {
// //     //     //         if (docElm.requestFullscreen) {
// //     //     //             docElm.requestFullscreen()
// //     //     //         }
// //     //     //     }
// //     //     // } else {
// //     //     //
// //     //     //     if (document.webkitExitFullscreen) {
// //     //     //         document.webkitExitFullscreen()
// //     //     //     } else if (document.webkitExitFullscreen) {
// //     //     //         document.webkitExitFullscreen()
// //     //     //     } else if (document.mozCancelFullScreen) {
// //     //     //         document.mozCancelFullScreen()
// //     //     //     } else if (document.msExitFullscreen) {
// //     //     //         document.msExitFullscreen()
// //     //     //     } else {
// //     //     //         if (document.exitFullscreen) {
// //     //     //             document.exitFullscreen()
// //     //     //         }
// //     //     //     }
// //     //     //
// //     //     // }
// //     // }
// //     window.addEventListener('click', activateFullscreenMode)
// //     window.addEventListener('click', deactivateFullscreenMode)
// //
// //
// //
// //     window.addEventListener('swiped-up', debounce(function() {
// //
// //         if (!document.body.classList.contains('fullscreen')) return
// //
// //         setTimeout(function() {
// //             setNextFullscreenVideo()
// //         }, 100)
// //
// //
// //     }, 100))
// //
// //     window.addEventListener('swiped-down', debounce(function() {
// //
// //         if (!document.body.classList.contains('fullscreen')) return
// //
// //         setTimeout(function() {
// //             setPrevFullscreenVideo()
// //         }, 100)
// //
// //     }, 100))
// //
// //     let lockSwapVideo = false
// //
// //     function setNextFullscreenVideo() {
// //
// //         if (!nextFullscreenVideo) return
// //
// //         if (lockSwapVideo) return
// //
// //         if (prevFullscreenVideo) {
// //             prevFullscreenVideo.classList.remove('fullscreen-prev')
// //         }
// //
// //         currentFullscreenVideo.classList.remove('fullscreen-current')
// //         nextFullscreenVideo.classList.remove('fullscreen-next')
// //
// //         let tempCurrentVideo = currentFullscreenVideo
// //
// //         if (tempCurrentVideo.querySelector('video')) {
// //             tempCurrentVideo.querySelector('video').pause()
// //         }
// //
// //
// //         setTimeout(function() {
// //             if (tempCurrentVideo.querySelector('video')) {
// //                 tempCurrentVideo.querySelector('video').currentTime = 0
// //             }
// //
// //         }, 400)
// //
// //         prevFullscreenVideo = currentFullscreenVideo
// //         currentFullscreenVideo = nextFullscreenVideo
// //         nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
// //
// //
// //         setTimeout(function() {
// //             if (currentFullscreenVideo.querySelector('video')) {
// //                 currentFullscreenVideo.querySelector('video').play()
// //             }
// //
// //         }, 400)
// //
// //
// //
// //         if (nextFullscreenVideo && !nextFullscreenVideo.hasAttribute('data-fullscreen-item')) {
// //             nextFullscreenVideo = null
// //         }
// //
// //         prevFullscreenVideo.classList.add('fullscreen-prev')
// //         currentFullscreenVideo.classList.add('fullscreen-current')
// //
// //         if (nextFullscreenVideo) {
// //             nextFullscreenVideo.classList.add('fullscreen-next')
// //         }
// //
// //         lockSwapVideo = true
// //         setTimeout(function() {
// //             lockSwapVideo = false
// //         }, 400)
// //     }
// //     function setPrevFullscreenVideo() {
// //         if (!prevFullscreenVideo) return
// //
// //         if (currentFullscreenVideo.classList.contains('.item-videos_main')) return
// //
// //         if (lockSwapVideo) return
// //
// //         if (nextFullscreenVideo) {
// //             nextFullscreenVideo.classList.remove('fullscreen-next')
// //         }
// //
// //         currentFullscreenVideo.classList.remove('fullscreen-current')
// //         prevFullscreenVideo.classList.remove('fullscreen-prev')
// //
// //         let tempCurrentVideo = currentFullscreenVideo
// //         setTimeout(function() {
// //             if (tempCurrentVideo.querySelector('video')) {
// //                 tempCurrentVideo.querySelector('video').pause()
// //             }
// //
// //         }, 400)
// //
// //         nextFullscreenVideo = currentFullscreenVideo
// //         currentFullscreenVideo = prevFullscreenVideo
// //         prevFullscreenVideo = currentFullscreenVideo.previousElementSibling
// //
// //         setTimeout(function() {
// //             if (currentFullscreenVideo.querySelector('video')) {
// //                 currentFullscreenVideo.querySelector('video').play()
// //             }
// //
// //         }, 400)
// //
// //         if (!prevFullscreenVideo) {
// //             prevFullscreenVideo = document.querySelector('.item-videos_main')
// //         }
// //
// //
// //         if (prevFullscreenVideo && !prevFullscreenVideo.hasAttribute('data-fullscreen-item')) {
// //             prevFullscreenVideo = null
// //         }
// //
// //
// //         if (prevFullscreenVideo) {
// //             prevFullscreenVideo.classList.add('fullscreen-prev')
// //         }
// //
// //         currentFullscreenVideo.classList.add('fullscreen-current')
// //         nextFullscreenVideo.classList.add('fullscreen-next')
// //
// //         lockSwapVideo = true
// //         setTimeout(function() {
// //             lockSwapVideo = false
// //         }, 400)
// //     }
// //     document.body.addEventListener('wheel', debounce(function(e) {
// //
// //         var y = e.deltaY || e.detail || e.wheelDelta
// //
// //         if (y > 0) {
// //             setTimeout(function() {
// //                 setNextFullscreenVideo()
// //             }, 100)
// //
// //         } else {
// //             setTimeout(function() {
// //                 setPrevFullscreenVideo()
// //             }, 100)
// //
// //         }
// //     }, 100))
// //
// //
// //
// //
// // })
// //
// //
// //
// document.addEventListener('DOMContentLoaded', function() {
//
//     const videosList = document.querySelector('.videos-model__items_list')
//     function cancelFullScreen() {
//         var el = document;
//         var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
//         if (requestMethod) { // cancel full screen.
//             requestMethod.call(el);
//         } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
//             var wscript = new ActiveXObject("WScript.Shell");
//             if (wscript !== null) {
//                 wscript.SendKeys("{F11}");
//             }
//         }
//     }
//
//     function requestFullScreen(el) {
//         // Supports most browsers and their versions.
//         var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
//
//         if (requestMethod) { // Native full screen.
//             requestMethod.call(el);
//         } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
//             var wscript = new ActiveXObject("WScript.Shell");
//             if (wscript !== null) {
//                 wscript.SendKeys("{F11}");
//             }
//         }
//         return false
//     }
//
//     function toggleFullScreen(el) {
//         if (!el) {
//             el = document.body; // Make the body go full screen.
//         }
//         var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);
//
//         if (isInFullScreen) {
//             cancelFullScreen();
//         } else {
//             requestFullScreen(el);
//         }
//         return false;
//     }
//     document.addEventListener('fullscreenchange', onFullScreenChange, false)
//     document.addEventListener('webkitfullscreenchange', onFullScreenChange, false)
//     document.addEventListener('mozfullscreenchange', onFullScreenChange, false)
//
//     function onFullScreenChange() {
//         // const isInFullScreen = document.body.classList.contains('fullscreen')
//         if (document.body.classList.contains('fullscreen')) {
//             const mainVideo = document.body.querySelector('.item-videos_main')
//
//             if (mainVideo) {
//                 document.querySelector('.base-video__content').appendChild(mainVideo)
//             }
//             const videos = document.querySelectorAll('[data-fullscreen-item]')
//             for (let index = 0; index < videos.length; index++) {
//                 const video = videos[index]
//
//                 if (video.classList.contains('item-videos_main')) continue
//
//                 videosList.appendChild(video)
//             }
//         } else {
//             // const mainVideo = document.querySelector('.base-video .videos__item')
//             //
//             // if (mainVideo) {
//             //     document.body.appendChild(mainVideo)
//             // }
//             const videos = document.querySelectorAll('[data-fullscreen-item]')
//             for (let index = 0; index < videos.length; index++) {
//                 const video = videos[index]
//
//                 document.body.appendChild(video)
//             }
//         }
//         document.body.classList.toggle('fullscreen')
//
//         // if (isInFullScreen) {
//         //     document.body.classList.remove('fullscreen')
//         // }
//
//     }
//
//     let nextFullscreenVideo = null
//     let prevFullscreenVideo = null
//     let currentFullscreenVideo = null
//
//
//     function activateFullscreenMode(e) {
//
//         if  (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_open')) {
//             if (document.body.classList.contains('fullscreen')) return
//
//             toggleFullScreen()
//
//             if (document.querySelector('.fullscreen-current')) {
//                 document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
//             }
//             if (document.querySelector('.fullscreen-next')) {
//                 document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
//             }
//             if (document.querySelector('.fullscreen-prev')) {
//                 document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
//             }
//
//             currentFullscreenVideo = e.target.closest('.item-videos')
//
//             currentFullscreenVideo.classList.add('fullscreen-current')
//
//             if (currentFullscreenVideo.classList.contains('item-videos_main')) {
//                 nextFullscreenVideo = document.querySelector('.videos-model .item-videos')
//
//                 nextFullscreenVideo.classList.add('fullscreen-next')
//             } else {
//                 nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
//                 prevFullscreenVideo = currentFullscreenVideo.previousElementSibling
//
//                 if (nextFullscreenVideo) {
//                     nextFullscreenVideo.classList.add('fullscreen-next')
//                 }
//
//                 if (prevFullscreenVideo) {
//                     prevFullscreenVideo.classList.add('fullscreen-prev')
//                 }
//             }
//
//         }
//     }
//     function deactivateFullscreenMode(e) {
//         if (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_opened')) {
//             if (!document.body.classList.contains('fullscreen')) return
//
//             toggleFullScreen()
//
//
//             if (document.querySelector('.fullscreen-current')) {
//                 document.querySelector('.fullscreen-current').classList.remove('fullscreen-current')
//             }
//             if (document.querySelector('.fullscreen-next')) {
//                 document.querySelector('.fullscreen-next').classList.remove('fullscreen-next')
//             }
//             if (document.querySelector('.fullscreen-prev')) {
//                 document.querySelector('.fullscreen-prev').classList.remove('fullscreen-prev')
//             }
//         }
//     }
//
//     window.addEventListener('click', activateFullscreenMode)
//     window.addEventListener('click', deactivateFullscreenMode)
//
//     window.addEventListener('swiped-up', debounce(function() {
//
//         if (!document.body.classList.contains('fullscreen')) return
//
//         setTimeout(function() {
//             setNextFullscreenVideo()
//         }, 100)
//
//
//     }, 100))
//
//     window.addEventListener('swiped-down', debounce(function() {
//
//         if (!document.body.classList.contains('fullscreen')) return
//
//         setTimeout(function() {
//             setPrevFullscreenVideo()
//         }, 100)
//
//     }, 100))
//
//     let lockSwapVideo = false
//
//     function setNextFullscreenVideo() {
//
//         if (!nextFullscreenVideo) return
//
//         if (lockSwapVideo) return
//
//         if (prevFullscreenVideo) {
//             prevFullscreenVideo.classList.remove('fullscreen-prev')
//         }
//
//         currentFullscreenVideo.classList.remove('fullscreen-current')
//         nextFullscreenVideo.classList.remove('fullscreen-next')
//
//         let tempCurrentVideo = currentFullscreenVideo
//
//         if (tempCurrentVideo.querySelector('video')) {
//             tempCurrentVideo.querySelector('video').pause()
//         }
//
//
//         setTimeout(function() {
//             if (tempCurrentVideo.querySelector('video')) {
//                 tempCurrentVideo.querySelector('video').currentTime = 0
//             }
//
//         }, 400)
//
//         prevFullscreenVideo = currentFullscreenVideo
//         currentFullscreenVideo = nextFullscreenVideo
//         nextFullscreenVideo = currentFullscreenVideo.nextElementSibling
//
//
//         setTimeout(function() {
//             if (currentFullscreenVideo.querySelector('video')) {
//                 currentFullscreenVideo.querySelector('video').play()
//             }
//
//         }, 400)
//
//
//
//         if (nextFullscreenVideo && !nextFullscreenVideo.hasAttribute('data-fullscreen-item')) {
//             nextFullscreenVideo = null
//         }
//
//         prevFullscreenVideo.classList.add('fullscreen-prev')
//         currentFullscreenVideo.classList.add('fullscreen-current')
//
//         if (nextFullscreenVideo) {
//             nextFullscreenVideo.classList.add('fullscreen-next')
//         }
//
//         lockSwapVideo = true
//         setTimeout(function() {
//             lockSwapVideo = false
//         }, 400)
//     }
//     function setPrevFullscreenVideo() {
//         if (!prevFullscreenVideo) return
//
//         if (currentFullscreenVideo.classList.contains('.item-videos_main')) return
//
//         if (lockSwapVideo) return
//
//         if (nextFullscreenVideo) {
//             nextFullscreenVideo.classList.remove('fullscreen-next')
//         }
//
//         currentFullscreenVideo.classList.remove('fullscreen-current')
//         prevFullscreenVideo.classList.remove('fullscreen-prev')
//
//         let tempCurrentVideo = currentFullscreenVideo
//         setTimeout(function() {
//             if (currentFullscreenVideo.querySelector('video')) {
//                 tempCurrentVideo.querySelector('video').pause()
//             }
//
//         }, 400)
//
//         nextFullscreenVideo = currentFullscreenVideo
//         currentFullscreenVideo = prevFullscreenVideo
//         prevFullscreenVideo = currentFullscreenVideo.previousElementSibling
//
//         setTimeout(function() {
//             if (currentFullscreenVideo.querySelector('video')) {
//                 currentFullscreenVideo.querySelector('video').play()
//             }
//
//         }, 400)
//
//         if (!prevFullscreenVideo) {
//             prevFullscreenVideo = document.querySelector('.item-videos_main')
//         }
//
//
//         if (prevFullscreenVideo && !prevFullscreenVideo.hasAttribute('data-fullscreen-item')) {
//             prevFullscreenVideo = null
//         }
//
//
//         if (prevFullscreenVideo) {
//             prevFullscreenVideo.classList.add('fullscreen-prev')
//         }
//
//         currentFullscreenVideo.classList.add('fullscreen-current')
//         nextFullscreenVideo.classList.add('fullscreen-next')
//
//         lockSwapVideo = true
//         setTimeout(function() {
//             lockSwapVideo = false
//         }, 400)
//     }
//     document.body.addEventListener('wheel', debounce(function(e) {
//
//         var y = e.deltaY || e.detail || e.wheelDelta
//
//         if (y > 0) {
//             setTimeout(function() {
//                 setNextFullscreenVideo()
//             }, 100)
//
//         } else {
//             setTimeout(function() {
//                 setPrevFullscreenVideo()
//             }, 100)
//
//         }
//     }, 100))
//
//
//
//
// })
document.addEventListener('DOMContentLoaded', function() {
    const videosList = document.querySelector('.videos-model__items_list')
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


        //         // const isInFullScreen = document.body.classList.contains('fullscreen')
//         if (document.body.classList.contains('fullscreen')) {
//             const mainVideo = document.body.querySelector('.item-videos_main')
//
//             if (mainVideo) {
//                 document.querySelector('.base-video__content').appendChild(mainVideo)
//             }
//             const videos = document.querySelectorAll('[data-fullscreen-item]')
//             for (let index = 0; index < videos.length; index++) {
//                 const video = videos[index]
//
//                 if (video.classList.contains('item-videos_main')) continue
//
//                 videosList.appendChild(video)
//             }
//         } else {
//             // const mainVideo = document.querySelector('.base-video .videos__item')
//             //
//             // if (mainVideo) {
//             //     document.body.appendChild(mainVideo)
//             // }
//             const videos = document.querySelectorAll('[data-fullscreen-item]')
//             for (let index = 0; index < videos.length; index++) {
//                 const video = videos[index]
//
//                 document.body.appendChild(video)
//             }
//         }
//         document.body.classList.toggle('fullscreen')
//
//         // if (isInFullScreen) {
//         //     document.body.classList.remove('fullscreen')
//         // }


        if (!isInFullScreen) {
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

                        // const mainVideo = document.querySelector('.base-video .videos__item')
            //
            // if (mainVideo) {
            //     document.body.appendChild(mainVideo)
            // }
            const mainVideo = document.body.querySelector('.item-videos_main')

            if (mainVideo) {
                document.querySelector('.base-video__content').appendChild(mainVideo)
            }
            const videos = document.querySelectorAll('[data-fullscreen-item]')
            for (let index = 0; index < videos.length; index++) {
                const video = videos[index]

                if (video.classList.contains('item-videos_main')) continue

                videosList.appendChild(video)
            }
        } else {
            const videos = document.querySelectorAll('[data-fullscreen-item]')
            for (let index = 0; index < videos.length; index++) {
                const video = videos[index]

                document.body.appendChild(video)
            }


        }

    }

    let nextFullscreenVideo = null
    let prevFullscreenVideo = null
    let currentFullscreenVideo = null


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
        if (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_opened')) {
            if (!document.body.classList.contains('fullscreen')) return

            toggleFullScreen()
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

        if (!prevFullscreenVideo) {
            prevFullscreenVideo = document.querySelector('.item-videos_main')
        }


        if (prevFullscreenVideo && !prevFullscreenVideo.hasAttribute('data-fullscreen-item')) {
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
            setTimeout(function() {
                setNextFullscreenVideo()
            }, 100)

        } else {
            setTimeout(function() {
                setPrevFullscreenVideo()
            }, 100)

        }
    }, 100))




})



