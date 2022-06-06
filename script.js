const introText = document.querySelector('.intro_text');
const introHeaderList = introText.querySelector('.header-list');
const introList = document.querySelector('.intro_additional_text ul');
const tooltiplIntroText = document.querySelector('.intro_text .tooltip');
let isPickIntro = false;

const hideAdditionalIntroText = () => {
	introList.classList.remove('active');
}

const showAdditionalIntroText = () => {
	introList.classList.add('active');
}

introHeaderList.onmouseenter = showAdditionalIntroText;

introText.onclick = () => {
	isPickIntro = !isPickIntro;
	tooltiplIntroText.innerText = isPickIntro ? 'Pinned' : 'Unpinned';
}

introText.onmouseleave = () => {
	if (!isPickIntro) {
		 hideAdditionalIntroText();
		 setTimeout(() => {
			tooltiplIntroText.innerText = 'Click to pin that';
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

const localStorageKey = {
	color: 'color',
	font: 'font'
}

const themes = {
	green: {
		bodyBackground: '#141414',
		resumeBackground: '#141414',
		primaryTextColor: '#eaeaea',
		secondaryTextColor: '#e3e3e3',
		durabilityTextColor: '#c6c6c69c',
		iconColor: '#6a737d',
		borderColor: '#01e909bb',
	}, 
	red: {
		bodyBackground: '#f8b786',
		resumeBackground: '#f4f6ec',
		primaryTextColor: '#ff1a4a',
		secondaryTextColor: '#2d0c03',
		durabilityTextColor: '#98514b',
		iconColor: '#5b5553',
		borderColor: '#2d0c03',
	}, 
	yellow: {
		bodyBackground: '#dcdcdc',
		resumeBackground: '#fdffcc',
		primaryTextColor: '#f9ae17',
		secondaryTextColor: '#AC132A',
		durabilityTextColor: '#740819',
		iconColor: '#740819',
		borderColor: '#540A15',
	}
}

const kebabize = (str) => 
	str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

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
			const value = item.querySelector('span').innerText;
			key === localStorageKey.font ? setFontFamily(value) : setTextColor(themes[value.toLowerCase()]);
		}
	});
}	

onclickFavorite(favoriteColors, localStorageKey.color);
onclickFavorite(favoriteFonts, localStorageKey.font);

window.addEventListener("DOMContentLoaded", () => {
	const color = localStorage.getItem(localStorageKey.color);
	color && setTextColor(JSON.parse(color));

	const font = localStorage.getItem(localStorageKey.font);
	font && setFontFamily(font);
});

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

			if (score  >= scoreElements.length) {
				showHint({
					title: `So you can found ${score} of ${scoreElements.length} clickable items`,
					message: `It's very cool, that we can light on on page for you`,
					seconds: 5,
					toDoAfterEnd: lightOn
				});
			} else if(score === scoreElements.length - 2) {
				showHint({
					title: `So you can find all ${scoreElements.length} clickable items`,
					message: `So now it's time to turn on the page light`,
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
	window.removeEventListener("resize", resizeListener);
	document.removeEventListener("mousemove", mousemoveListener);
}

const lightOff = () => {
	flashlight.classList.add('active');
	window.addEventListener("resize", resizeListener);
	document.addEventListener("mousemove", mousemoveListener);
}

const resizeListener = () => {
	flashlight.style.height = `${getPageHeight()}px`;
}

const mousemoveListener = (e) => {
	const x = e.pageX;
	const y = e.pageY;
	flashlight.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent, #000 20%)`;
}
