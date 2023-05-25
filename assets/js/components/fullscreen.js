// document.addEventListener('DOMContentLoaded', function() {
//
//     let currentFullscreenVideo = null
//     let nextFullscreenVideo = null
//     window.addEventListener('click', function(e) {
//         if  (e.target.closest('.vjs-fullscreen-control')) {
//             if (document.body.classList.contains('fullscreen')) {
//                 document.body.classList.remove('fullscreen')
//             } else {
//                 document.body.classList.add('fullscreen')
//
//                 currentFullscreenVideo = e.target.closest('.item-videos')
//
//                 if (currentFullscreenVideo.classList.contains('.item-videos_main')) {
//                     nextFullscreenVideo = document.querySelector('.videos-model .videos__item')
//                     nextFullscreenVideo.classList.add('fullscreen-next')
//                 }
//
//             }
//         }
//         //
//         // const div = document.querySelector('video')
//         // console.log(div)
//         // if (div.requestFullscreen)
//         //     div.requestFullscreen();
//         // else if (div.webkitRequestFullscreen)
//         //     div.webkitRequestFullscreen();
//         // else if (div.msRequestFullScreen)
//         //     div.msRequestFullScreen();
//     })
//     // var videoPlayer = videojs('.video-js');
//     // videoPlayer.requestFullscreen();
//     // document.querySelector('.vjs-fullscreen-control').click()
//     // document.querySelector('.vjs-play-control').click()
//
//     // let scrollTop = 0
//     // if (document.getElementById('video-9999').requestFullscreen) {
//     //     document.getElementById('video-9999').requestFullscreen();
//     // }
//
//     document.body.addEventListener('wheel', debounce(function(e) {
//         // // const diff = e.target.scrollTop - scrollTop
//         // //
//         // scrollTop = e.target.scrollTop
//
//         var y = e.deltaY || e.detail || e.wheelDelta
//         console.log(y)
//
//     }, 50))
// })
