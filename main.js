import { localStorageKey } from "./enums/local-storage-key.js";
import { themes } from "./enums/themes.js";
import {
		defaultLanguage,
		lang,
		tooltip,
		scoreGame,
		langSelectors,
		changeTextSelectors,
		alphabet
} from './enums/lang.js';

const introText = document.querySelector('.intro_text');
const introHeaderList = introText.querySelector('.header-list');
const introList = document.querySelector('.intro_additional_text ul');
const tooltipIntroText = document.querySelector('.intro_text .tooltip');
let isPickIntro = false;

const hideAdditionalIntroText = () =>
	introList.classList.remove('active');

const showAdditionalIntroText = () =>
	introList.classList.add('active');

introHeaderList.onmouseenter = showAdditionalIntroText;

const getActiveLang = () => localStorage.getItem(localStorageKey.lang) || defaultLanguage;

introText.onclick = () => {
	isPickIntro = !isPickIntro;
	const currentLang = getActiveLang();
	tooltipIntroText.innerText = isPickIntro
		? tooltip[currentLang].pinned
		: tooltip[currentLang].unpinned;
}

introText.onmouseleave = () => {
	if (!isPickIntro) {
		 hideAdditionalIntroText();
		const currentLang = getActiveLang();
		 setTimeout(() => {
			tooltipIntroText.innerText = tooltip[currentLang].helper;
		}, 500);
	}
}

const favoriteColors = [
	document.querySelector('.contact_info_container.favorite .red'),
	document.querySelector('.contact_info_container.favorite .green'),
	document.querySelector('.contact_info_container.favorite .yellow')
];

const favoriteFonts = [
	document.querySelector('.contact_info_container.favorite .montserrat'),
	document.querySelector('.contact_info_container.favorite .poppins'),
	document.querySelector('.contact_info_container.favorite .cascadia-code')
];

const kebabize = (str) =>
	str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

const setTextColor = (selectedTheme) => {
	for(let key in selectedTheme) {
		document.body.style.setProperty(`--${kebabize(key.toString())}`, selectedTheme[key]);
	}
	localStorage.setItem(localStorageKey.color, JSON.stringify(selectedTheme));
}

const setFontFamily = (font) => {
	document.body.style.setProperty('font-family', font);
	localStorage.setItem(localStorageKey.font, font);
}

const onclickFavorite = (array, key) => {
	array.forEach(item => {
		item.onclick = () => {
			const value = item.dataset.favorite;
			key === localStorageKey.font ? setFontFamily(value) : setTextColor(themes[value.toLowerCase()]);
		}
	});
}

onclickFavorite(favoriteColors, localStorageKey.color);
onclickFavorite(favoriteFonts, localStorageKey.font);

const getPageHeight = () => Math.max(
	document.body.scrollHeight,
	document.body.offsetHeight,
	document.body.clientHeight,
	document.documentElement.offsetHeight,
	document.documentElement.clientHeight
);

const scoreElements = document.querySelectorAll('.score-element');
const currentScore = document.querySelector('.score-counter .current');
const maxScore = document.querySelector('.score-counter .max');
maxScore.innerText = scoreElements.length;

const popup = document.querySelector('.popup');
const popupTitle = popup.querySelector('.title');
const popupMessage = popup.querySelector('.message');
const popupSeconds = popup.querySelector('.seconds');

const flashlight = document.querySelector('.flashlight');
flashlight.style.height = `${getPageHeight()}px`;

let score = 0;
let clicked = [];
scoreElements.forEach(item => {
	item.addEventListener('click',() => {
		if(!clicked.includes(item)) {
			clicked.push(item);
			score++;
			currentScore.innerText = score;
			if (score >= scoreElements.length) {
				showHint({
					title: scoreGame.gameFinished.title({
						lang: getActiveLang(),
						currentScore: score,
						maxScore: scoreElements.length,
					}),
					message: scoreGame.gameFinished.message({
						lang: getActiveLang(),
					}),
					seconds: 5,
					showSecondsElement: popupSeconds,
					toDoAfterEnd: lightOn
				});
			} else if(score === scoreElements.length - 2) {
				showHint({
					title: scoreGame.gameStarted.title({
						lang: getActiveLang(),
						maxScore: scoreElements.length,
					}),
					message: scoreGame.gameFinished.message({
						lang: getActiveLang(),
					}),
					seconds: 3,
					showSecondsElement: popupSeconds,
					toDoAfterEnd: lightOff
				});
			}
		}
	});
});

const showHint = ({title, message, seconds, showSecondsElement, toDoAfterEnd}) => {
	if(!popup.classList.contains('active')) {
		popupTitle.innerText = title;
		popupMessage.innerText = message;
		popup.classList.add('active');
		let seconds2 = seconds;

		const intervalId = setInterval(() => {
			seconds2--;
			if (showSecondsElement) {
				showSecondsElement.innerText = seconds2;
			}
		}, 1000);

		setTimeout(() => {
			clearInterval(intervalId);
			if (showSecondsElement) {
				showSecondsElement.innerText = '';
			}
			if (toDoAfterEnd) {
				toDoAfterEnd();
			}
			popup.classList.remove('active');
		}, (seconds + 1) * 1000);
	}
}

const lightOn = () => {
	flashlight.classList.remove('active');
	window.removeEventListener('resize', resizeListener);
	document.removeEventListener('mousemove', mousemoveListener);
}

const lightOff = () => {
	flashlight.classList.add('active');
	window.addEventListener('resize', resizeListener);
	document.addEventListener('mousemove', mousemoveListener);
}

const resizeListener = () => {
	flashlight.style.height = `${getPageHeight()}px`;
}

const mousemoveListener = (e) => {
	const x = e.pageX;
	const y = e.pageY;
	flashlight.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent, #000 20%)`;
}

const changeLanguage = ({ selectedLang, withAnimation = true }) => {
	const getRandomLetters = (string) => {
		const chars = selectedLang === defaultLanguage ? alphabet.en : alphabet.ua;
		const length = string.replace(/\s/g, '').length;
		const iterations = length > 20 ? 20 : length;
		let str = '';

		for (let i = 0; i < iterations; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}

		return str;
	}

	const changeWithAnimation = ({ element, innerText }) => {
		const intervalID = setInterval(() => {
			element.innerText = getRandomLetters(element.innerText);
		}, 100);

		setTimeout(() => {
			element.innerText = innerText;
			clearInterval(intervalID);
		}, 300);
	}

	const changeWithoutAnimation = ({ element, innerText }) => {
		element.innerText = innerText;
	}

	const changeSameElements = ({ elements, value }) =>
		elements.forEach((element) => {
			withAnimation
				? changeWithAnimation({ element, innerText: value })
				: changeWithoutAnimation({ element, innerText: value });
		});

	const changeArrayOfElements = ({ elements, values }) =>
		elements.forEach((element, index) => {
			withAnimation
				? changeWithAnimation({ element, innerText: values[index] })
				: changeWithoutAnimation({ element, innerText: values[index] });
		});


	Object.entries(lang[selectedLang]).forEach(([key, value]) => {
		const elements = document.querySelectorAll(changeTextSelectors.render(key));
		if (!elements.length) {
			console.warn(`Missed elements with key: ${key}`);
		}

		if (Array.isArray(value)) {
			changeArrayOfElements({ elements, values: value })
		} else {
			changeSameElements({ elements, value });
		}
	});
}

const langButtons = document.querySelectorAll('.additional-info__languages-item');

langButtons.forEach(btn =>
	btn.onclick = () => {
		if (btn.classList.contains('active')) return;

		langButtons.forEach(btn => btn.classList.remove('active'));
		btn.classList.add('active');

		const selectedLang = btn.dataset.lang;
		localStorage.setItem(localStorageKey.lang, selectedLang);

		changeLanguage({ selectedLang });
	}
);

window.addEventListener('DOMContentLoaded', () => {
	const color = localStorage.getItem(localStorageKey.color);
	color && setTextColor(JSON.parse(color));

	const font = localStorage.getItem(localStorageKey.font);
	font && setFontFamily(font);

	const selectedLang = getActiveLang();
	const langSelector = selectedLang ? langSelectors.render(selectedLang) : langSelectors.en;
	document.querySelector(langSelector).classList.add('active');
	selectedLang !== defaultLanguage
		&& changeLanguage({
			selectedLang,
			withAnimation: false
		});
});
