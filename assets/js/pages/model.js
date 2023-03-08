// Имитация данных

const modelTags = [
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
    {link: "", text: "Tag1"},
]

document.addEventListener('DOMContentLoaded', async function() {

    const tagsItems = document.querySelector('.tags-model__items')
    const tagsToggler = document.querySelector('.tags-model__toggler')

    let tags = []
    const limit = 25

    async function initTags() {
        // Запрос на сервер
        // const response = await fetch('https://your-uri')
        // const data = response.json()

        tags = modelTags


        minimizeTags()
    }

    function createHTMLTag(tag) {
        const itemEl = document.createElement('li')

        itemEl.className = 'tags-model__item'
        itemEl.innerHTML = `
                 <a href="${tag.link}" class="tags-model__link">${tag.text}</a>
            `

       return itemEl
    }

    function toggleTags(e) {

        if (tagsToggler.classList.contains('more')) {
            addTags()
        } else {
            tagsItems.innerHTML = ''

            minimizeTags()

            const togglerItem = document.createElement('li')
            togglerItem.className = 'tags-model__item'
            togglerItem.appendChild(tagsToggler)

            tagsItems.appendChild(togglerItem)
        }
    }

    function addTags() {
        for (let index = limit; index < tags.length; index++) {

            if (!tags[index]) break;

            const tag = tags[index]

            const element = createHTMLTag(tag)


            prependChild(tagsItems, element)

            tagsToggler.classList.remove('more')
            tagsToggler.textContent = 'minimize'
        }
    }
    function minimizeTags() {
        const diff = tags.length - limit;
        for (let index = 0; index < limit; index++) {
            if (!tags[index]) break;

            const tag = tags[index]

            const element = createHTMLTag(tag)


            prependChild(tagsItems, element)
        }

        tagsToggler.textContent = `+${diff}`
        tagsToggler.classList.add('more')
    }
    tagsToggler.addEventListener('click', toggleTags)


    await initTags()


    const modelAvatar = document.querySelector('.body-model__avatar')

    modelAvatar.addEventListener('click', function() {
        modelAvatar.classList.toggle('active')
    })

    window.addEventListener('click', function(e) {
        if (!e.target.closest('.body-model__avatar')) {
            modelAvatar.classList.remove('active')
        }
    })


    const videosRow = document.querySelector('.videos-model__row')

    if (videosRow) {

        videosRow.addEventListener('mousemove', playVideo)

        videosRow.addEventListener('touchstart', function(e) {


            function detectOffset(e) {
                if (!e.target.closest('.block-video')) return
                if (e.target.closest('.block-video').querySelector('video.active')) return

                if (document.querySelector('video.active')) {
                    pauseCurrentVideo(document.querySelector('video.active'))
                }
                e.preventDefault()
                playVideo(e)
            }
            e.currentTarget.addEventListener('touchmove', debounce(detectOffset, 50), {once: true})



        })


    }
    function playVideo(e) {
        if (e.target.closest('.block-video')) {
            const video = e.target.closest('.block-video').querySelector('video')

            if (!video) return

            if (video.classList.contains('lazy-video')) {
                for (let source in video.children) {

                    const videoSource = video.children[source];

                    if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                        videoSource.src = videoSource.dataset.src;
                    }
                }
                video.load();
                video.classList.remove("lazy-video");

            }
            video.play()
            video.classList.add('active')
            video.closest('.block-video').classList.add('active')
        }
    }
    function pauseVideo(e) {
        if (
            e.currentTarget.querySelector('video')
            && !e.currentTarget.querySelector('video').classList.contains('active')
        )  {
            return
        }

        const video = e.currentTarget.querySelector('video')
        if (!video) return

        pauseCurrentVideo(video)
    }

    function pauseCurrentVideo(video) {
        video.pause()
        video.currentTime = 0
        video.src = ""
        video.removeAttribute('src')
        video.classList.remove('active')
        video.closest('.block-video').classList.remove('active')
    }
    const videoBlocks = document.querySelectorAll('.block-video')

    if (videoBlocks.length > 0) {
        for (let index = 0; index < videoBlocks.length; index++) {
            const videoBlock = videoBlocks[index]
            videoBlock.addEventListener('mouseleave', pauseVideo)
        }
    }

    window.addEventListener('click', function(e) {
        if (e.target.closest('.block-video__likes') && !e.target.closest('.block-video__likes').classList.contains('disabled')) {

            const likesElement = e.target.closest('.block-video__likes')
            likesElement.querySelector('span').textContent = Number(likesElement.querySelector('span').textContent) + 1

            likesElement.classList.add('disabled')
            e.preventDefault()
        }

    })

})


