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
        var isInFullScreen = document.body.classList.contains('fullscreen')
        if (isInFullScreen) {
            cancelFullScreen();
        } else {
            requestFullScreen(el);
        }
        return false;
    }
    videosList.addEventListener('fullscreenchange', onFullScreenChange, false)
    videosList.addEventListener('webkitfullscreenchange', onFullScreenChange, false)
    videosList.addEventListener('mozfullscreenchange', onFullScreenChange, false)

    function onFullScreenChange() {

        if (document.body.classList.contains('fullscreen')) {
            const mainVideo = videosList.querySelector('.item-videos_main')

            if (mainVideo) {
                document.querySelector('.base-video__content').appendChild(mainVideo)
            }
        } else {
            const mainVideo = document.querySelector('.base-video .videos__item')

            if (mainVideo) {
                prependChild(videosList, mainVideo)
            }
        }
        document.body.classList.toggle('fullscreen')


    }


    function activateFullscreenMode(e) {

        if  (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_open')) {
            if (document.body.classList.contains('fullscreen')) return

            toggleFullScreen(videosList)

        }
    }
    function deactivateFullscreenMode(e) {
        if (e.target.closest('html') && e.target.closest('.fullscreen-control-item-videos__button_opened')) {
            if (!document.body.classList.contains('fullscreen')) return

            toggleFullScreen(videosList)
        }
    }

    window.addEventListener('click', activateFullscreenMode)
    window.addEventListener('click', deactivateFullscreenMode)

})



