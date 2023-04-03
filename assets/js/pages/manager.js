document.addEventListener('DOMContentLoaded', function() {

    let selectedCheckboxesCount = 0
    const totalManagerLabel = document.querySelector('.total-manager__label')
    const totalManagerCheckbox = document.querySelector('.total-manager__checkbox input')

    window.addEventListener('click', function(e) {
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
    })

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

    onTagsScroll()

})


