// Модальные окна
document.addEventListener('DOMContentLoaded', function() {
    const modalLinks = document.querySelectorAll('[data-modal-link]')

    if (modalLinks.length > 0) {
        for (let index = 0; index < modalLinks.length; index++) {
            const link = modalLinks[index]
            link.addEventListener('click', function(e) {
                e.preventDefault()

                const scrollWidth = window.innerWidth - document.body.clientWidth

                const modalTitle = '#' + e.currentTarget.dataset.modalLink

                document.querySelector(modalTitle).classList.add('active')

                setTimeout(() => {
                    // document.body.classList.remove('lock')
                    // document.body.style.paddingRight = 0
                    document.body.classList.add('lock')
                    document.body.style.paddingRight = scrollWidth + 'px'
                }, 400)


            })
        }
    }

    const modalCloseButtons = document.querySelectorAll('[data-modal-close]')

    if (modalCloseButtons.length > 0) {
        for (let index = 0; index < modalCloseButtons.length; index++) {
            const closeButton = modalCloseButtons[index]
            closeButton.addEventListener('click', function(e) {
                e.target.closest('.modal').classList.remove('active')

                setTimeout(() => {
                    document.body.classList.remove('lock')
                    document.body.style.paddingRight = 0
                }, 400)
            })
        }
    }
})
