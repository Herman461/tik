

document.addEventListener('DOMContentLoaded', function() {

    let randomTags = [
        { id: '1', value: 'Tagname' },
        { id: '2', value: 'Tagname' },
        { id: '3', value: 'Tagname' },
        { id: '4', value: 'Tagname' },
        { id: '5', value: 'Tagname' },
    ]

    let selectedCheckboxesCount = 0
    const totalManagerLabel = document.querySelector('.total-manager__label')
    const totalManagerCheckbox = document.querySelector('.total-manager__checkbox input')

    if (window.matchMedia("(min-width: 991.98px)").matches) {
        window.addEventListener('click', function(e) {
            onWindowClick(e)
            if (e.target.closest('.total-manager__checkbox')) {
                const totalCheckbox = document.querySelector('.total-manager__checkbox input')


                const checkboxes = document.querySelectorAll('.item-manager__checkbox input')

                if (checkboxes.length > 0) {
                    if (totalCheckbox.checked) {
                        for (let index = 0; index < checkboxes.length; index++) {
                            const checkbox = checkboxes[index]
                            checkbox.checked = true
                        }
                    } else {
                        for (let index = 0; index < checkboxes.length; index++) {
                            const checkbox = checkboxes[index]
                            checkbox.checked = false
                        }
                    }
                }

            }
        })
    } else {
        window.addEventListener('touchend', function(e) {
            onWindowClick(e)
            if (e.target.closest('.total-manager__checkbox')) {
                const totalCheckbox = document.querySelector('.total-manager__checkbox input')


                const checkboxes = document.querySelectorAll('.item-manager__checkbox input')

                if (checkboxes.length > 0) {
                    if (totalCheckbox.checked) {
                        for (let index = 0; index < checkboxes.length; index++) {
                            const checkbox = checkboxes[index]
                            checkbox.checked = false
                        }

                    } else {
                        for (let index = 0; index < checkboxes.length; index++) {
                            const checkbox = checkboxes[index]
                            checkbox.checked = true
                        }
                    }
                }

            }
        })
    }


    const itemManagerCheckboxes = document.querySelectorAll('.item-manager__checkbox input')


    totalManagerCheckbox.addEventListener('change', function(e) {
        const currentCheckbox = e.currentTarget

        const checkboxes = document.querySelectorAll('.item-manager__checkbox input')

        if (checkboxes.length > 0) {
            selectedCheckboxesCount = checkboxes.length

            if (currentCheckbox.checked) {
                totalManagerLabel.innerHTML = selectedCheckboxesCount + ' videos selected <span>Clear</span>'
            } else {
                selectedCheckboxesCount = 0
                totalManagerLabel.innerHTML = 'No videos selected'
            }

        }
    })
    if (itemManagerCheckboxes.length > 0) {
        for (let index = 0; index < itemManagerCheckboxes.length; index++) {
            const checkbox = itemManagerCheckboxes[index]

            checkbox.addEventListener('change', function(e) {
                const currentCheckbox = e.currentTarget

                if (currentCheckbox.checked) {
                    selectedCheckboxesCount += 1
                    totalManagerLabel.innerHTML = selectedCheckboxesCount + ' videos selected <span>Clear</span>'
                } else {
                    selectedCheckboxesCount -= 1

                    if (selectedCheckboxesCount === 0) {
                        totalManagerLabel.innerHTML = 'No videos selected'
                    } else {
                        totalManagerLabel.innerHTML = selectedCheckboxesCount + ' videos selected <span>Clear</span>'
                    }
                }
            })

        }
    }


    function onTagsScroll() {
        const tagBodies = document.querySelectorAll('.tags-item-manager__body')

        for (let index = 0; index < tagBodies.length; index++) {
            const tagBody = tagBodies[index]

            const simpleBar = new SimpleBar(tagBody)
            simpleBar.getScrollElement().addEventListener('scroll', function(e) {
                const wrapper = e.currentTarget
                const body = wrapper.closest('.tags-item-manager__body')


                if (wrapper.scrollTop === (wrapper.scrollHeight - wrapper.clientHeight)) {
                    body.classList.add('end')
                } else {
                    body.classList.remove('end')


                }
            });
        }
    }

    function onWindowClick(e) {
        if (e.target.closest('.copy-item-manager__button')) {
            const copyUrlBtn = e.target.closest('.copy-item-manager__button')
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


        if (e.target.closest('.tags-item-manager__close')) {
            const closeButton = e.target.closest('.tags-item-manager__close')

            closeButton.closest('.tags-item-manager__tag').remove()
            setSuccessAlert('Success!')
        }



        if (e.target.closest('.total-manager__label span')) {
            selectedCheckboxesCount = 0
            const checkboxes = document.querySelectorAll('.item-manager__checkbox input')

            if (checkboxes.length > 0) {
                for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index]
                    checkbox.checked = false
                }
            }

            totalManagerCheckbox.checked = false

            totalManagerLabel.innerHTML = 'No videos selected'

        }

        if (e.target.closest('.total-manager__more')) {
            e.target.closest('.total-manager__more').classList.toggle('active')
            document.querySelector('.total-manager__actions').classList.toggle('active')
        }

        if (e.target.closest('.tags-item-manager__clear')) {
            const clearButton = e.target.closest('.tags-item-manager__clear')

            clearButton.previousElementSibling.value = ''

            clearButton.classList.remove('active')
        }

        // Кидаем тег в оболочку
        if (e.target.closest('.manager-tags-results__item')) {
            const currentTag = e.target.closest('.manager-tags-results__item')
            const id = currentTag.dataset.tagId
            const text = currentTag.textContent
            const foundIndex = randomTags.findIndex(item => id === item.id)



            const newTag = createItemTag({text})

            const wrapper = currentTag.closest('.item-manager').querySelector('.tags-item-manager__body .simplebar-content')
            wrapper.appendChild(newTag)

            randomTags = []
            currentTag.closest('.tags-item-manager__input').querySelector('.manager-tags-results').innerHTML = ''
            currentTag.remove()
        }
    }

    onTagsScroll()


    function createItemTag(data) {
        const newTag = document.createElement('div')
        newTag.className = 'tags-item-manager__tag'

        newTag.innerHTML = `
                          <input type="hidden" value="">
                          <span>${data.text}</span>
                          <div class="tags-item-manager__close">
                              <svg>
                                  <use xlink:href="assets/images/icons/icons.svg#close"></use>
                              </svg>
                          </div>
            `
        return newTag
    }

    const itemTagsInputs = document.querySelectorAll('.tags-item-manager__input input')

    for (let index = 0; index < itemTagsInputs.length; index++) {
        const input = itemTagsInputs[index]

        input.addEventListener('input', function(e) {
            const currentTarget = e.currentTarget
            const value = currentTarget.value
            const clearButton = currentTarget.nextElementSibling
            const resultWrapper = e.currentTarget.closest('.tags-item-manager__input').querySelector('.manager-tags-results')

            const re = /^\w+$/;

            if (!re.test(value)) {
                currentTarget.value = value.slice(0, -1)
            }
            if (value.length === 0 && clearButton.classList.contains('active')) {
                clearButton.classList.remove('active')
            }

            if (value.length !== 0 && !clearButton.classList.contains('active')) {
                clearButton.classList.add('active')
            }

            // Здесь можно сделать ajax запрос для показа результата поиска тегов

            // Результат поиска
            // const response = await fetch('https://your-uri')
            // const result = response.json()

            const result = randomTags

            resultWrapper.innerHTML = ''
            if (result.length > 0) {

                for (let index = 0; index < result.length; index++) {
                    const item = result[index]

                    const element = document.createElement('li')
                    element.className = 'manager-tags-results__item'
                    element.dataset.tagId = item.id
                    element.innerHTML = item.value

                    resultWrapper.appendChild(element)
                    resultWrapper.classList.add('active')

                }
            } else {
                if (resultWrapper.classList.contains('active')) {
                    resultWrapper.classList.remove('active')
                }


            }

        })
        input.addEventListener('keydown', function(e) {
            if (e.keyCode === 13) {

                const resultsWrapper = e.currentTarget.parentElement.querySelector('.manager-tags-results')

                const firstTag = resultsWrapper.querySelector('.manager-tags-results__item')

                if (firstTag) {
                    const text = firstTag.textContent
                    const newTag = createItemTag({text})
                    const wrapper = e.currentTarget.closest('.item-manager').querySelector('.tags-item-manager__body .simplebar-content')
                    wrapper.appendChild(newTag)
                    randomTags = []
                    firstTag.closest('.tags-item-manager__input').querySelector('.manager-tags-results').innerHTML = ''
                    firstTag.remove()
                }
            }
            return false
        })
    }
})


