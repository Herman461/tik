document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('click', function(e) {

        if (e.target.closest('.copy-success-upload__button')) {
            const copyUrlBtn = e.target.closest('.copy-success-upload__button')
            const link = copyUrlBtn.parentElement.querySelector('span').textContent

            if (link) {
                let tempInput = document.createElement('textarea')

                tempInput.style.fontSize = '12pt'
                tempInput.style.border = '0'
                tempInput.style.padding = '0'
                tempInput.style.margin = '0'
                tempInput.style.position = 'absolute'
                tempInput.style.left = '-9999px'
                tempInput.setAttribute('readonly', '')

                tempInput.value = link

                copyUrlBtn.parentNode.appendChild(tempInput)

                tempInput.select()
                tempInput.setSelectionRange(0, 99999)

                document.execCommand('copy')

                tempInput.parentNode.removeChild(tempInput)
                e.preventDefault()

                setSuccessAlert('Copied!')

            }
        }
    })
    if (document.querySelector('.schedule-upload__calendar')) {
        const picker = new Pikaday({
            field: document.querySelector('.schedule-upload__date input'),
            container: document.querySelector('.schedule-upload__calendar'),
            bound: false,
            minDate: new Date(),
            maxDate: new Date(Date.now() + (1000 * 60 * 60 * 24 * 19)),
            onOpen: buildCalendarArrows,
            onDraw: buildCalendarArrows
        })

        function buildCalendarArrows() {
            const pikaPrev = document.querySelector('.pika-prev')
            const pikaNext = document.querySelector('.pika-next')

            pikaPrev.classList.add('stroke')
            pikaNext.classList.add('stroke')

            pikaPrev.innerHTML = `
         <svg>
            <use xlink:href="assets/images/icons/icons.svg#angle-right"></use>
         </svg>
    `
            pikaNext.innerHTML = `
         <svg>
            <use xlink:href="assets/images/icons/icons.svg#angle-right"></use>
         </svg>
    `
        }

        buildCalendarArrows()


        const dateInput = document.querySelector('.schedule-upload__date input')
        dateInput.addEventListener('focus', function() {
            document.querySelector('.schedule-upload__calendar').classList.add('active')
        })

        const baseSelectTimeList = document.querySelector('.base-select__list')

        const baseSelectTimeWrapper = document.createElement('div')
        const baseSelectTimeBody = document.createElement('div')

        baseSelectTimeWrapper.className = 'base-select__wrapper'
        baseSelectTimeBody.className = 'base-select__body'
        baseSelectTimeBody.appendChild(baseSelectTimeList)
        baseSelectTimeWrapper.appendChild(baseSelectTimeBody)

        baseSelectTimeList.hidden = false
        baseSelectTimeWrapper.hidden = true

        document.querySelector('.schedule-upload__time .base-select__head').addEventListener('click', function(e) {
            if (!document.querySelector('.base-select__wrapper.slide') && e.target.closest('.base-select__head')) {
                if (e.target.closest('.base-select__head').classList.contains('active')) {

                    baseSelectTimeWrapper.closest('.base-select').querySelector('.base-select__head').classList.remove('active')


                }
                baseSelectTimeList.hidden = false
                e.currentTarget.classList.toggle('active')
                slideToggle(baseSelectTimeWrapper)
            }
        })

        document.querySelector('.schedule-upload__time').appendChild(baseSelectTimeWrapper)
        new SimpleBar(document.querySelector('.base-select__body'));
    }



    const stepBlocks = document.querySelectorAll('[data-upload-step]')
    const uploadButton = document.querySelector('.upload__button')
    const progressBar = document.querySelector('.upload__line')
    const circles = document.querySelectorAll('.upload__step')

    let currentStep = 0
    function showNextStep() {
        currentStep++

        document.querySelector('[data-upload-step].active').classList.remove('active')

        const block = document.querySelector(`[data-upload-step="${currentStep}"]`)

        block.classList.add('active')
        if (circles[currentStep - 1]) {
            circles[currentStep - 1].classList.add('active')
        }


        if (currentStep !== 5) {
            progressBar.style.width = `calc(${currentStep * 33.333 - 33.333}% - 4px)`
        }
        if (currentStep === 1) {
            document.querySelector('.upload__steps').classList.add('visible')
            document.querySelector('.upload__bottom').classList.add('visible')
        }

        if (currentStep === 4) {
            uploadButton.setAttribute('disabled', '')
        }
        if (currentStep === 5) {
            document.querySelector('.upload__steps').classList.remove('visible')
            document.querySelector('.upload__bottom').classList.remove('visible')
        }
    }

    uploadButton.addEventListener('click', showNextStep)


    // Логика загрузки видео

    if (document.querySelector('.select-upload__body')) {
        const selectUploadBody = document.querySelector('.select-upload__body')
        const selectUploadInput = document.querySelector('.select-upload__input')

        selectUploadBody.addEventListener('click', function(e) {
            document.querySelector('.select-upload__input').click()
        })

        selectUploadInput.addEventListener('change', function(e) {
            const files = e.target.files
            const file = files[0];
            const urlBlob = URL.createObjectURL(file);

            const video = document.createElement('video')
            document.querySelector('.cutter-upload__video').appendChild(video)

            showNextStep()

            video.setAttribute('muted', '')
            video.setAttribute('autoplay', '')

            video.src = urlBlob

            video.load()
            video.onloadeddata = function() {
                video.play()
            }


        })

    }


    // Обрезка видео

    if (document.querySelector('.upload__cutter')) {
        const cutterSlider = document.querySelector('.progress-cutter-upload__slider');

        noUiSlider.create(cutterSlider, {
            start: [0, 100],
            connect: true,
            range: {
                'min': 20,
                'max': 80
            }
        });

    }

    // Теги

    if (document.querySelector('.upload__tags')) {
        const tagsWrapper = document.querySelector('.tags-upload__items')
        let activeTagsValues = []
        function addTagsToDOM(tags) {

            const allCurrentTags = tagsWrapper.querySelectorAll('.tags-upload__item')

            if (allCurrentTags.length > 0) {
                for (let index = 0; index < allCurrentTags.length; index++) {
                    const tag = allCurrentTags[index]

                    if (!tag.classList.contains('active')) {
                        tag.remove()
                    }
                }
            }

            for (let index = 0; index < tags.length; index++) {
                const tag = tags[index]

                const hasActiveTag = activeTagsValues.includes(tag.value)

                if (hasActiveTag) continue

                const element = document.createElement('li')
                element.className = 'tags-upload__item'
                element.dataset.tagId = tag.id
                element.textContent = tag.value

                tagsWrapper.appendChild(element)

            }
        }
        const randomTags = [
            {id: '1', value: 'Tag1'},
            {id: '2', value: 'Tag2'},
            {id: '3', value: 'Tag3'},
            {id: '4', value: 'Tag4'},
            {id: '5', value: 'Tag5'},
            {id: '6', value: 'Tag6'},
            {id: '7', value: 'Tag7'},
            {id: '8', value: 'Tag8'},
            {id: '9', value: 'Tag9'},
            {id: '10', value: 'Tag10'},
            {id: '11', value: 'Tag11'},
            {id: '12', value: 'Tag12'},
            {id: '13', value: 'Tag13'},
            {id: '14', value: 'Tag14'},
            {id: '15', value: 'Tag15'},
            {id: '16', value: 'Tag16'},
            {id: '17', value: 'Tag17'},
            {id: '18', value: 'Tag18'},
            {id: '19', value: 'Tag19'},
            {id: '20', value: 'Tag20'},
            {id: '21', value: 'Tagname1'},
            {id: '22', value: 'Tagname2'},
            {id: '23', value: 'Tagname3'},
            {id: '24', value: 'Tagname4'},
            {id: '25', value: 'Tagname5'},
        ]
        addTagsToDOM(randomTags)

        window.addEventListener('click', function(e) {


            if (e.target.closest('.tags-upload__item')) {
                const selectedTag = e.target.closest('.tags-upload__item')

                if (selectedTag.classList.contains('active')) {
                    selectedTag.classList.remove('active')
                    tagsWrapper.appendChild(selectedTag)

                    activeTagsValues = activeTagsValues.filter(activeTagValue => activeTagValue !== selectedTag.textContent)


                } else {
                    selectedTag.classList.add('active')
                    tagsWrapper.insertBefore(selectedTag, tagsWrapper.firstChild);

                    activeTagsValues.push(selectedTag.textContent)
                }

                if (activeTagsValues.length >= 3 && activeTagsValues.length <= 15) {
                    if (uploadButton.hasAttribute('disabled')) {
                        uploadButton.removeAttribute('disabled')
                    }
                } else {
                    if (!uploadButton.hasAttribute('disabled')) {
                        uploadButton.setAttribute('disabled', '')
                    }

                }
            }

            if (document.querySelector('.schedule-upload__calendar.active')
                && !e.target.closest('.schedule-upload__calendar')
                && !e.target.closest('.schedule-upload__date')
            ) {
                document.querySelector('.schedule-upload__calendar.active').classList.remove('active')
            }

            if (
                document.querySelector('.schedule-upload__time .base-select__head.active')
                && !e.target.closest('.schedule-upload__time .base-select__list')
                && !e.target.closest('.schedule-upload__time .base-select__head')
            ) {
                document.querySelector('.schedule-upload__time .base-select__head').classList.remove('active')
                slideUp(document.querySelector('.schedule-upload__time .base-select__list'))
            }

        })

        const tagsInput = document.querySelector('.tags-upload__input input')


        tagsInput.addEventListener('input', function(e) {
            const value = e.target.value

            const re = /^\w+$/;

            if (!re.test(value)) {
                e.target.value = value.slice(0, -1)


            }

        })
        // Запрос на сервер
        tagsInput.addEventListener('input', debounce(function(e) {
            const newTags = randomTags.filter(tag => tag.value.toLowerCase().includes(e.target.value.toLowerCase()))

            addTagsToDOM(newTags)
        }, 300))
    }

})




