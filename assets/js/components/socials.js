// Социальные сети
const addSocialButton = document.querySelector('.add-button')
const socials = [
    {

        value: 'chaturbate',
        text: 'Chaturbate',
        icon: 'chaturbate',
        relativeUrl: 'm.chaturbate.com/'
    },
    {
        value: 'fansly',
        text: 'Fansly',
        icon: 'fansly',
        relativeUrl: 'fansly.com/'
    },
    {
        value: 'instagram',
        text: 'Instagram',
        icon: 'instagram',
        relativeUrl: 'instagram.com/'
    },
    {

        value: 'manyvids',
        text: 'Manyvids',
        icon: 'manyvids',
        relativeUrl: 'manyvids.com/'
    },
    {

        value: 'MyFreeCams',
        text: 'MyFreeCams',
        icon: 'MyFreeCams',
        relativeUrl: 'm.myfreecams.com/'
    },
    {
        value: 'onlyfans',
        text: 'OnlyFans',
        icon: 'onlyfans',
        relativeUrl: 'onlyfans.com/'
    },
    {
        value: 'patreon',
        text: 'Patreon',
        icon: 'patreon',
        relativeUrl: 'patreon.com/'
    },
    {
        value: 'pornhub',
        text: 'PornHub',
        icon: 'pornhub',
        relativeUrl: 'pornhub.com/'
    },
    {
        value: 'reddit',
        text: 'Reddit',
        icon: 'reddit',
        relativeUrl: 'reddit.com/'
    },
    {
        value: 'twitter',
        text: 'Twitter',
        icon: 'twitter',
        relativeUrl: 'twitter.com/'
    },
    {
        value: 'xhamster',
        text: 'xHamster',
        icon: 'xhamster',
        relativeUrl: 'xhamster.com/'
    },
]

const accessSocials = JSON.parse(JSON.stringify(socials))

function selectSocialItem(e) {
    if (e.target.closest('.select__item')) {
        const socialsWrapper = document.querySelector('.socials')
        const clickedValue = e.target.closest('.select__item').dataset.value

        const currentSocialIndex = accessSocials.findIndex(function (item) {
            return item.value === clickedValue
        })


        const submitButton = document.querySelector('.submit-button')

        if (submitButton && submitButton.hasAttribute('disabled')) {
            submitButton.removeAttribute('disabled')
        }

        const currentSocial = accessSocials.splice(currentSocialIndex, 1)[0]

        e.target.closest('.socials__select').remove()


        // Создание инпута
        const socialInput = document.createElement('div')
        socialInput.className = 'socials__input socials__input_flex'
        socialInput.dataset.value = clickedValue

        socialInput.innerHTML = `
            <div class="socials__icon">
                <svg>
                    <use xlink:href="assets/images/icons/icons.svg#${currentSocial.icon}"></use>
                </svg>
            </div>
            <input type="text" class="input"> 
            <div class="socials__trash">
                <svg>
                    <use xlink:href="assets/images/icons/icons.svg#trash"></use>
                </svg>
            </div>
        `
        socialsWrapper.appendChild(socialInput)
        socialInput.querySelector('input').value = currentSocial.relativeUrl
        socialInput.querySelector('input').focus()
        addSocialButton.classList.add('active')

        updateSocialList()

        if (accessSocials.length === 0) {
            addSocialButton.classList.add('hide')
        }
    }
}

function setSocialSelect() {
    if (!addSocialButton) return
    if (addSocialButton.classList.contains('active')) {
        addSocialButton.classList.remove('active')
    }
    if (accessSocials.length > 0) {
        const select = document.createElement('div')
        select.className = "socials__select select"
        select.addEventListener('click', selectSocialItem)


        const selectHead = document.createElement('div')
        selectHead.textContent = 'Choose'
        selectHead.className = 'select__head'

        selectHead.addEventListener('click', function () {
            slideToggle(selectHead.nextElementSibling)
            selectHead.classList.add('active')
        })

        select.appendChild(selectHead)

        let selectList = document.createElement('ul')
        selectList.hidden = true
        selectList.className = 'select__list'

        selectList = setSocialList(selectList)
        select.appendChild(selectList)
        document.querySelector('.socials').appendChild(select)
    }
}

function setSocialList(socialList) {
    for (let index = 0; index < accessSocials.length; index++) {
        const social = accessSocials[index]

        if (social === undefined) continue

        const selectItem = document.createElement('li')

        selectItem.dataset.value = social.value
        selectItem.className = 'select__item'
        selectItem.innerHTML = `
                    <svg>
                        <use xlink:href="assets/images/icons/icons.svg#${social.icon}"></use>
                    </svg>
                    ${social.text}
                `

        socialList.appendChild(selectItem)
    }
    return socialList
}

function deleteSocialItem(e) {
    if (!e.target.closest('.socials__trash')) return

    const trashButton = e.target.closest('.socials__trash')

    const inputWrapper = trashButton.closest('.socials__input')
    const currentValue = inputWrapper.dataset.value

    const currentSocialIndex = socials.findIndex(function (item) {
        return item.value === currentValue
    })

    const currentSocial = socials.find(function (item) {
        return item.value === currentValue
    })

    accessSocials.splice(currentSocialIndex, 0, currentSocial)

    inputWrapper.remove()

    if (addSocialButton && addSocialButton.classList.contains('hide')) {
        addSocialButton.classList.remove('hide')
    }

    updateSocialList()
}

function updateSocialList() {
    const socialLists = document.querySelectorAll('.socials .select__list')
    if (socialLists.length > 0) {
        for (let index = 0; index < socialLists.length; index++) {
            const socialList = socialLists[index]
            socialList.innerHTML = ''
            setSocialList(socialList)
        }
    }
}



if (addSocialButton) {
    addSocialButton.addEventListener('click', setSocialSelect)
}

setSocialSelect()

window.addEventListener('click', deleteSocialItem)

window.addEventListener('click', function(e) {
    if (
        !e.target.closest('.socials__select')
        && document.querySelector('.select__head.active')
    ) {
        const activeSelectHead = document.querySelector('.select__head.active')

        activeSelectHead.classList.remove('active')
        slideToggle(activeSelectHead.nextElementSibling)
    }
})



window.addEventListener('click', function(e) {
    if (e.target.closest('.socials__icon')) {
        const inputIcon = e.target.closest('.socials__icon')
        const inputWrapper = inputIcon.closest('.socials__input')
        inputWrapper.querySelector('input').focus()
    }
})
