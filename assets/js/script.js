let sliders = document.querySelectorAll(".swiper");
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-build')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement("div");
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = "";
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-build');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_build_callback();
}

function sliders_build_callback() { }



function ibg() {

	let ibg = document.querySelectorAll(".ibg");

	for (let index = 0; index < ibg.length; index++) {
		if (ibg[index].querySelector('img')) {
			ibg[index].style.backgroundImage = 'url(' + ibg[index].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();

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


let spoilersArray = document.querySelectorAll("[data-spoilers]");

if (spoilersArray.length > 0) {
	// Получение обычный спойлеров
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	})
	// Инициализация обычных спойлеров
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	})

	// Инициализация спойлеров с медиа запросами
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];

		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		})

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(item => {
			return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
		});

		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		})

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			})
			matchMedia.addEventListener("change", function () {
				initSpoilers(spoilersArray, matchMedia)
			})
			initSpoilers(spoilersArray, matchMedia);
		})
	}

	// Инициализация
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add("init");
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove("init");
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		})
	}

	// Работа с контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute("tabindex");
					if (!spoilerTitle.classList.contains("active")) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute("tabindex", "-1");
					spoilerTitle.nextElementSibling.hidden = false;
				}
			})
		}
	}
	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll(".slide").length) {
				if (oneSpoiler && !spoilerTitle.classList.contains("active")) {
					hideSpoilerBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle("active");
				slideToggle(spoilerTitle.nextElementSibling, 500)
			}
			e.preventDefault();
		}
	}
	function hideSpoilerBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove("active");
			slideUp(spoilerActiveTitle.nextElementSibling, 500)
		}
	}
}


document.addEventListener('DOMContentLoaded', function() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");

		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	// Функция сортировки массива по breakpoint и place
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();


})

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

				document.body.classList.add('lock')

                document.body.style.paddingRight = scrollWidth + 'px'

            })
        }
    }

    const modalCloseButtons = document.querySelectorAll('.modal__close')

    if (modalCloseButtons.length > 0) {
        for (let index = 0; index < modalCloseButtons.length; index++) {
            const closeButton = modalCloseButtons[index]
            closeButton.addEventListener('click', function(e) {
                e.target.closest('.modal').classList.remove('active')


                setTimeout(() => {
					document.body.classList.remove('lock')
                    document.body.style.paddingRight = 0
                }, 300)
            })
        }
    }
})

function debounce(func, wait, immediate) {

	let timeout;

	return function() {

		let context = this,
			args = arguments;

		let callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(function() {

			timeout = null;

			if (!immediate) {

				func.apply(context, args);
			}
		}, wait);

		if (callNow) func.apply(context, args);
	}
}
const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function prependChild(parentEle, newFirstChildEle) {
	parentEle.insertBefore(newFirstChildEle, parentEle.firstChild)
}

// Табы
// const tabLinks = document.querySelectorAll("[data-tab-title]");
// const tabContent = document.querySelectorAll("[data-tab-content]");
//
//
// if (tabContent.length > 0)  {
// 	tabLinks.forEach(function(el) {
// 		el.addEventListener("click", openTabs);
// 	});
//
// }
//
// function openTabs(el) {
// 	el.preventDefault()
// 	const btnTarget = el.currentTarget;
// 	const title = btnTarget.dataset.tabTitle;
// 	const category = btnTarget.dataset.tabCategory
//
// 	const tabContent = document.querySelectorAll(`[data-tab-content][data-tab-category="${category}"]`);
// 	const tabLinks = document.querySelectorAll(`[data-tab-title][data-tab-category="${category}"]`);
//
// 	tabContent.forEach(function(el) {
// 		el.classList.remove("active");
// 	});
//
// 	tabLinks.forEach(function(el) {
// 		el.classList.remove("active");
// 	});
//
// 	const activeContent = document.querySelectorAll(`[data-tab-content="${title}"][data-tab-category="${category}"]`)
//
// 	activeContent.forEach(function(el) {
// 		el.classList.add('active')
// 	})
// 	document.querySelector(`[data-tab-content="${title}"]`).classList.add("active");
//
// 	btnTarget.classList.add("active");
//
// }

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

		const disabledOption = item.querySelector('option[disabled]')
		const duration = 400

		item.querySelector('select').hidden = true

		const head = document.createElement('div')
		const text = document.createElement('span')

		head.classList.add('base-select__head')

		text.textContent = disabledOption ? disabledOption.textContent : selectedOption.textContent

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
				slideUp(selectList)
			}
		})
	}
}


window.addEventListener('click', function(e) {

	if (
		document.querySelector('.base-select__head.active')
		&& !e.target.closest('.base-select')
		&& !document.querySelector('.base-select__list.slide')
	) {
		if (activeSelect) {
			activeSelect.closest('.base-select').querySelector('.base-select__head').classList.remove('active')
			slideUp(activeSelect)
			activeSelect = null
		}

	}
})

