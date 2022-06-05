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