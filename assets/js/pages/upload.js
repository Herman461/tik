document.addEventListener('DOMContentLoaded', function() {

    const currentDate = new Date()
    const prevButton = document.querySelector('.top-upload__prev')

    const file_name = document.querySelector('input[name="file_name"]')
    const time_start = document.querySelector('input[name="time_start"]')
    const time_end = document.querySelector('input[name="time_end"]')
    const scheduled_time = document.querySelector('input[name="scheduled_time"]')
    const name = document.querySelector('input[name="name"]')

    let calendarValue = 0;
    let timeValue = 0;
    let wasVideoCreated = false

    let file;

    Date.prototype.addDays = function(days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }


    window.addEventListener('click', function(e) {
        if (e.target.closest('.calendar-schedule-upload__day span')) {
            const daysCount = Number( e.target.closest('.calendar-schedule-upload__day').dataset.day )
            const dateInput = document.querySelector('.schedule-upload__date input')



            const newDate = currentDate.addDays(daysCount)
            const day = newDate.getDate()
            const month = newDate.getMonth() + 1
            const year = newDate.getFullYear()

            dateInput.value = `${day}/${month}/${year}`;

            calendarValue = Math.floor( newDate.getTime() / 1000 )
            calculateTime()
            if (window.matchMedia('(max-width: 991.98px)').matches) {
                document.querySelector('.schedule-upload__date input').blur()
                e.target.closest('.schedule-upload__calendar').classList.remove('active')
            }
        }
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
            container: document.querySelector('.calendar-schedule-upload__body'),
            bound: false,
            minDate: currentDate,
            maxDate: new Date(Date.now() + (1000 * 60 * 60 * 24 * 19)),
            onOpen: buildCalendarArrows,
            onDraw: buildCalendarArrows,
            onSelect() {
                if (window.matchMedia('(max-width: 991.98px)').matches) {
                    document.querySelector('.schedule-upload__date input').blur()
                    document.querySelector('.schedule-upload__calendar').classList.remove('active')
                }
            },
            toString(date, format) {
                calendarValue = Math.floor( date.getTime() / 1000 )

                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                calculateTime()
                return `${day}/${month}/${year}`;
            }
        })

        document.querySelector('.schedule-upload__time select').addEventListener('change', function() {

            timeValue = Number( document.querySelector('.schedule-upload__time option[selected]').value )
            calculateTime()
        })

        function calculateTime() {
            scheduled_time.value = timeValue + calendarValue
        }

        const closeButton = document.querySelector('.calendar-schedule-upload__close')

        closeButton.addEventListener('click', function(e) {
            document.querySelector('.schedule-upload__date input').blur()
            e.target.closest('.schedule-upload__calendar').classList.remove('active')
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

    prevButton.addEventListener('click', showPrevStep)

    function isPrevButtonHidden() {
        if (currentStep === 0) {
            prevButton.classList.add('hide')
        }

        if (currentStep !== 0 && prevButton.classList.contains('hide')) {
            prevButton.classList.remove('hide')
        }



    }
    isPrevButtonHidden()
    function showPrevStep(e) {
        if (currentStep === 0) return
        currentStep--
        document.querySelector('[data-upload-step].active').classList.remove('active')

        const block = document.querySelector(`[data-upload-step="${currentStep}"]`)
        block.classList.add('active')

        isPrevButtonHidden()

        if (currentStep === 0) {
            document.querySelector('.upload__steps').classList.remove('visible')
            document.querySelector('.upload__bottom').classList.remove('visible')

            document.querySelector('.cutter-upload__video').innerHTML = ''
            document.querySelector('.progress-cutter-upload__slider').noUiSlider.destroy();
            document.querySelector('.progress-cutter-upload__slider').innerHTML = ''
            document.querySelector('.progress-cutter-upload__slider').className = 'progress-cutter-upload__slider'
        }

        if (currentStep !== 5) {
            progressBar.style.width = `calc(${currentStep * 33.333 - 33.333}% - 4px)`
        }
        if (currentStep === 3 && uploadButton.hasAttribute('disabled')) {
            uploadButton.removeAttribute('disabled')
        }

        if (currentStep === 2) {
            document.querySelector('.cutter-upload__video video').play()
        }
        e.preventDefault()
    }
    function showNextStep() {

        if (currentStep === 4 && !wasVideoCreated) {
            uploadButton.setAttribute('disabled', '')
            createNewVideo()
            return
        }

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

        if (currentStep === 3) {
            document.querySelector('.cutter-upload__video video').pause()
        }
        if (currentStep === 4) {
            uploadButton.setAttribute('disabled', '')
        }
        if (currentStep === 5) {
            document.querySelector('.upload__steps').classList.remove('visible')
            document.querySelector('.upload__bottom').classList.remove('visible')
            document.querySelector('.upload__top').classList.add('hide')
        }

        isPrevButtonHidden()
    }

    uploadButton.addEventListener('click', showNextStep)


    // Логика загрузки видео

    if (document.querySelector('.select-upload__body')) {
        const selectUploadBody = document.querySelector('.select-upload__body')
        const selectUploadInput = document.querySelector('.select-upload__input')

        function setNewVideo() {

            const urlBlob = URL.createObjectURL(file);

            const video = document.createElement('video')
            document.querySelector('.cutter-upload__video').appendChild(video)

            showNextStep()

            video.muted = true
            video.setAttribute('autoplay', '')
            video.setAttribute('playsinline', '')

            video.src = urlBlob

            file_name.value = urlBlob

            video.load()
            video.onloadeddata = function() {
                video.play()
                addCutter()
            }


        }

        selectUploadBody.addEventListener('click', function(e) {
            document.querySelector('.select-upload__input').click()
        })

        selectUploadInput.addEventListener('change', function(e) {
            const files = e.target.files
            file = files[0];

            setNewVideo()
            e.target.value = null
        })

        function createNewVideo() {
            document.querySelector('.upload__progressbar').classList.remove('hide')
            const progressbar = document.querySelector('.progressbar-upload__line span')
            const progress = document.querySelector('.progressbar-upload__label span')
            const url = "http://localhost:3000/"
            const xhr = new XMLHttpRequest()
            xhr.file = file
            xhr.addEventListener('progress', function(e) {
                const done = e.position || e.loaded, total = e.totalSize || e.total
                const currentProgress = Math.trunc( Math.floor(done/total*1000)/10 ) + '%'
                progressbar.style.width = currentProgress
                progress.textContent = currentProgress
            }, false)
            if ( xhr.upload ) {
                xhr.upload.onprogress = function(e) {
                    const done = e.position || e.loaded, total = e.totalSize || e.total
                    currentProgress = Math.trunc( Math.floor(done/total*1000)/10 ) + '%'
                    progressbar.style.width = currentProgress
                    progress.textContent = currentProgress

                }
            }
            xhr.onreadystatechange = function(e) {
                if ( 4 == this.readyState ) {
                    wasVideoCreated = true
                    showNextStep()
                    document.querySelector('.upload__progressbar').classList.add('hide')
                }
            };
            xhr.open('post', url, true)
            xhr.setRequestHeader("Content-Type","multipart/form-data")
            xhr.send(file)
        }


        selectUploadBody.ondragover = selectUploadBody.ondragenter = function(evt) {
            evt.preventDefault();
        };
        selectUploadBody.ondrop = function(evt) {

            selectUploadInput.files = evt.dataTransfer.files

            const dT = new DataTransfer()
            dT.items.add(evt.dataTransfer.files[0])

            selectUploadInput.files = dT.files
            evt.preventDefault()

            file = selectUploadInput.files[0]
            setNewVideo()
        }

        selectUploadBody.addEventListener('dragenter', function() {
            if (!selectUploadBody.classList.contains('drop')) {
                selectUploadBody.classList.add('drop')
            }
        })
        selectUploadBody.addEventListener('dragleave', function() {
            if (selectUploadBody.classList.contains('drop')) {
                selectUploadBody.classList.remove('drop')
            }
        })
    }







    function addCutter() {
        // Обрезка видео
        const cutterSlider = document.querySelector('.progress-cutter-upload__slider');
        let videoSlider;

        const newVideo = document.querySelector('.cutter-upload__video video')

        const videoDuration = Math.ceil(newVideo.duration)
        const limit = 60

        let minTime = 0
        let maxTime = videoDuration > limit ? limit : videoDuration

        if (!videoSlider) {
            videoSlider = noUiSlider.create(cutterSlider, {
                start: [minTime, maxTime],
                connect: true,
                range: {
                    'min': 0,
                    'max': videoDuration
                },

                tooltips: true,
                format: wNumb({
                    decimals: 0
                }),
            });

            videoSlider.on('slide', function(values) {

                const lowerValue = Number( values[0] )
                const upperValue = Number( values[1] )
                // videoSlider.set(values[0], upperValue)
                if (minTime !== lowerValue) {
                    minTime = lowerValue

                    if (upperValue - lowerValue > limit) {

                        videoSlider.set([String(lowerValue), String(lowerValue + limit)])
                    }
                }

                if (maxTime !== upperValue) {
                    maxTime = upperValue

                    if (upperValue - lowerValue > limit) {
                        videoSlider.set([String(upperValue - limit), String(upperValue)])
                    }
                }


            })
            videoSlider.on('update', debounce(function(values) {
                minTime = Number( values[0] )
                maxTime = Number( values[1] )

                time_start.value = minTime
                time_end.value = maxTime
                // Воспроизводим каждый раз сначала при обновлении значения слайдера
                newVideo.currentTime = minTime
                // Не воспроизводить сначала при изменении значения слайдера
                // if (minTime > newVideo.currentTime) {
                //     newVideo.currentTime = minTime
                // }

            }, 300));
        }




        newVideo.addEventListener('ended', function() {
            console.log(minTime)
            newVideo.currentTime = minTime
            newVideo.play()
        })

        newVideo.addEventListener('timeupdate', function() {
            if (newVideo.currentTime > maxTime) {
                newVideo.currentTime = minTime
            }
        })



    }

    // Теги

    if (document.querySelector('.upload__tags')) {
        const tagsWrapper = document.querySelector('.tags-upload__items')
        let activeTagsValues = []

        function createNewTag(value) {
            const hiddenInput = document.createElement('input')
            hiddenInput.setAttribute('type', 'hidden')
            hiddenInput.setAttribute('name', 'tag')
            hiddenInput.value = value
            document.querySelector('.upload__form').appendChild(hiddenInput)
        }

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

        function onWindowClick(e) {
            if (e.target.closest('.tags-upload__item')) {
                const selectedTag = e.target.closest('.tags-upload__item')

                if (selectedTag.classList.contains('active')) {
                    selectedTag.classList.remove('active')
                    tagsWrapper.appendChild(selectedTag)

                    activeTagsValues = activeTagsValues.filter(activeTagValue => activeTagValue !== selectedTag.textContent)

                    document.querySelector(`input[name="tag"][value="${selectedTag.textContent}"]`).remove()

                } else {
                    selectedTag.classList.add('active')
                    tagsWrapper.insertBefore(selectedTag, tagsWrapper.firstChild);

                    activeTagsValues.push(selectedTag.textContent)
                    createNewTag(selectedTag.textContent)
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

        }
        if (window.matchMedia("(min-width: 767.98px)").matches) {
            window.addEventListener('click', onWindowClick)
        } else {
            window.addEventListener('touchend', onWindowClick)
        }


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




