let slideUp = (target, duration = 500) => {
    if (!target.classList.contains('slide')) {
        target.classList.add('slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
}

let slideDown = (target, duration = 500) => {
    if (!target.classList.contains('slide')) {
        target.classList.add('slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
}

let slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}

// Select
const select = document.querySelectorAll('.base-select')
let activeSelect
if (select.length > 0) {
    for (let index = 0; index < select.length; ++index) {
        const item = select[index]

        const selectOption = item.querySelectorAll('option')

        const selectOptionLength = selectOption.length

        let selectedOption = item.querySelector('option[selected]')

        if (!selectedOption) {
            selectedOption = item.querySelector('option')
        }

        if (item.classList.contains('base-select_sort')) {
            const queryParam = getParameterByName('sort')
            if (queryParam) {
                selectedOption = item.querySelector('option[value="?sort=' + queryParam + '"]')
                if (selectedOption) {
                    selectedOption.setAttribute('selected', 'selected')
                } else {
                    selectedOption = item.querySelector('option')
                }

            }

        }

        if (item.classList.contains('base-select_per-page')) {
            const queryParam = getParameterByName('per-page')
            if (queryParam) {
                selectedOption = item.querySelector('option[value="?per-page=' + queryParam + '"]')

                if (selectedOption) {
                    selectedOption.setAttribute('selected', 'selected')
                } else {
                    selectedOption = item.querySelector('option')
                }

            }

        }

        const baseHeadText = item.dataset.head
        const duration = 400

        item.querySelector('select').hidden = true

        const head = document.createElement('div')
        const text = document.createElement('span')

        head.classList.add('base-select__head')

        text.textContent = baseHeadText ? baseHeadText : selectedOption.textContent

        head.append(text)
        item.append(head)

        // Добавление иконки
        const icon = item.querySelector('.base-select__icon')

        if (icon) {
            head.append(icon)
        }

        // Создание списка
        const selectList = document.createElement('ul')
        selectList.classList.add('base-select__list')

        item.append(selectList)

        // if (!disabledOption) {
        // 	const newOption = document.createElement('li')
        // 	newOption.textContent = selectedOption ? selectedOption.textContent : selectOption[0].textContent
        // 	newOption.classList.add('base-select__item')
        // 	newOption.dataset.value = selectedOption ? selectedOption.value : selectOption[0].textContent
        // 	selectList.append(newOption)
        // }
        for (let index = 0; index < selectOptionLength; index++) {
            const newOption = document.createElement('li')
            newOption.textContent = selectOption[index].textContent
            newOption.classList.add('base-select__item')
            newOption.dataset.value = selectOption[index].value
            selectList.append(newOption)

            if (selectOption[index].hasAttribute('selected')) {
                newOption.classList.add('active')
            }
        }

        selectList.hidden = true
        head.addEventListener('click', function(e) {
            if (e.target.closest('.base-select_h')) return;
            if (!document.querySelector('.base-select__list.slide') && e.target.closest('.base-select__head')) {
                if (activeSelect && !e.target.closest('.base-select__head').nextElementSibling.isEqualNode(activeSelect)) {
                    slideUp(activeSelect)
                    activeSelect.closest('.base-select').querySelector('.base-select__head').classList.remove('active')


                }
                activeSelect = e.target.closest('.base-select__head').nextElementSibling
                e.currentTarget.classList.toggle('active')
                slideToggle(selectList)
            }
        })
        selectList.addEventListener('click', function(e) {
            if (e.target.closest('.base-select__item')) {
                const target = e.target.closest('.base-select__item')

                const value = target.dataset.value
                let newSelectedEl = item.querySelector(`option[value="${value}"]`)
                const oldSelectedEl = item.querySelector('option[selected]')
                if (!newSelectedEl) {
                    for (let index = 1; index < selectOptionLength; index++) {
                        const option = selectOption[index]
                        if (option.textContent === value) {
                            newSelectedEl = option
                        }
                    }
                }

                if (oldSelectedEl) {
                    oldSelectedEl.removeAttribute('selected')
                }
                if (newSelectedEl) {
                    newSelectedEl.setAttribute('selected', 'selected')
                    text.textContent = newSelectedEl.textContent
                }
                head.classList.remove('active')
                activeSelect = null

                if (document.querySelector('.base-select__item.active')) {
                    document.querySelector('.base-select__item.active').classList.remove('active')
                }


                target.classList.add('active')
                e.target.closest('.base-select').querySelector('select').dispatchEvent(new Event('change'))

                if (e.target.closest('.base-select_h')) {
                    slideUp(e.target.closest('.base-select__wrapper'))
                } else {
                    slideUp(selectList)
                }

            }
        })
    }
}
