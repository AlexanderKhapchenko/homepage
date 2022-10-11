const defaultLanguage = 'en';

const lang = {
    ua: {
        header: "Олександр Хапченко",
        subheader: "Full-stack розробник",
        age: "25 років",
        hometown: "Київ, Україна",
        favoriteColors: "Улюблені кольори",
        favoriteFonts: "Улюблені шрифти",
        red: "Червоний",
        green: "Зелений",
        yellow: "Жовтий",
        introFirst: "Перепробував",
        introClickable: "багато напрямків програмування.",
        introLast: "Знайшов себе в WebDev 💜",
        introItem: [
            "Розробив програмне ядро MIPS на Quartus та модель Sim на Verilog, протестоване на CYCLON V з використанням двійкового коду",
            "Створював друковані плати в Altium, креслення в AutoCad та оболонки в SolidWorks",
            "Писав програмний код на Arduino, Stm, Pic, Esp",
            "Створював вибірки даних для нейронної мережі з використанням Python для подальшого навчання в MATLAB",
            "Розробляв додатки на C# з використанням баз даних .NetCore та MySQL",
            "Створював ігри на Unity Engine з запіканням освітлення, AR, мультиплеєром, постобробкою тощо",
            "І багато іншого",
        ],
        skills: "Навички",
        experience: "Досвід роботи",
        education: "Освіта",
        robocodePosition: "Вчитель",
        robocodeSubheader: "Офлайн освіта",
        robocodeDuties: [
            "Навчанав дітей роботі з мікроконтролерами, створювання ігор та сайтів",
            "Керування викладацьким складом",
            "Догляд за обладнанням",
            "Вирішувати конфлікти",
        ],
        edisonPosition: "Директор",
        edisonSubheader: "Робіть маленьких українців кращими",
        edisonDuties: [
            "Створення навчальної програми для створення ігор та сайтів",
            "Навчання дітей створенню ігор та сайтів",
            "Управління викладацьким складом",
            "Підвищення кваліфікації викладачів",
            "Догляд за обладнанням",
            "Дизайн постів у соціальних мережах",
            "Написання текстів для соціальних мереж, реклами, сайту",
            "Рендерінг відео",
        ],
        bachelor: "Бакалавр",
        master: "Магістр",
        phd: "Аспірант",
        kpi: "КПІ ім. Ігоря Сікорського",
        languages: "Мови",
        ukrainian: "Українська (носій мови)",
        english: "Англійська мова (середній рівень)",
        now: "зараз",
        found: "Знайдено",
        of: "з",
        clickable: "клікабельних елементів",
        pin: "Натисніть, щоб закріпити чи відкріпити це",
    },
    en: {
        header: "Alexander Khapchenko",
        subheader: "Full-stack Developer",
        age: "25 years",
        hometown: "Kyiv, Ukraine",
        favoriteColors: "Favorite colors",
        favoriteFonts: "Favorite fonts",
        red: "Red",
        green: "Green",
        yellow: "Yellow",
        introFirst: "Tried",
        introClickable: "a lot of branches of programming.",
        introLast: "Found myself in WebDev 💜",
        introItem: [
            "Developed MIPS software kernel in Quartus & Model Sim in Verilog, tested on CYCLON V using binary code",
            "Created circuit boards in Altium, drawings in AutoCad, and shells in SolidWorks",
            "Wrote program code on Arduino, Stm, Pic, Esp",
            "Created data samples for neural network using Python for further training in MATLAB",
            "Developed C# applications using .NetCore and MySQL databases",
            "Created games in Unity Engine with baking lights, AR, multiplayer, post-processing etc",
            "And much more",
        ],
        skills: "Skills",
        experience: "Experience",
        education: "Education",
        robocodePosition: "Teacher",
        robocodeSubheader: "Offline Education",
        robocodeDuties: [
            "Teaching children Embedded, GameDev, WebDev",
            "Lead the faculty",
            "Observe the equipment",
            "Resolve conflicts",
        ],
        edisonPosition: "CEO",
        edisonSubheader: "Make little Ukrainians better",
        edisonDuties: [
            "Creating a GameDev and WebDev training program",
            "Teaching children GameDev and WebDev",
            "Management of teaching staff",
            "Teacher training",
            "Observe the equipment",
            "Social media post design",
            "Writing texts for social networks, advertising, website",
            "Video rendering",
        ],
        bachelor: "Bachelor",
        master: "Master",
        phd: "PhD Aspirant",
        kpi: "Igor Sikorsky Kyiv Polytechnic Institute",
        languages: "Languages",
        ukrainian: "Ukrainian (native speaker)",
        english: "English (Intermediate)",
        now: "now",
        found: "Found",
        of: "of",
        clickable: "clickable items",
        pin: "Click to pin or unpin that",
    }
}

const tooltip = {
    ua: {
        pinned: 'Закріплено',
        unpinned: 'Незакріплено',
        helper: 'Натисніть, щоб закріпити це',
    },
    en: {
        pinned: 'Pinned',
        unpinned: 'Unpinned',
        helper: 'Click to pin that',
    }
}

const scoreGame = {
    gameStarted: {
        title: ({lang, maxScore}) =>
             lang === 'en'
                    ? `So I guess you can find all the ${maxScore} elements you can click on`
                    : `Щож, я гадаю, що ви можете знайти всі елементи ${maxScore}, на які можна натиснути`,
        message: ({lang}) =>
            lang === 'en'
                ? `But it's time to turn off the light on the page`
                : `Але час вимкнути світло на сторінці`,
    },
    gameFinished: {
        title: ({lang, maxScore, currentScore}) =>
            lang  === 'en'
                ? `So you can found ${currentScore} of ${maxScore} clickable items`
                : `Щож, ви знайшли ${currentScore} з ${maxScore} клікабельних елементів`,
        message: ({lang}) =>
            lang === 'en'
                ? `I am very pleased that I can now cover this page for yo`
                : `Дуже приємно, що тепер я можу висвітлити цю сторінку для вас`,
    }
}

const langSelectors = {
    en: "[data-lang=\"en\"]",
    ua: "[data-lang=\"ua\"]",
    render: (lang) => `[data-lang="${lang}"]`,
}

const changeTextSelectors = {
    render: (value) => `[data-text="${value}"`
}

const alphabet = {
    en: "abcdefghijklmnopqrstuvwxyz",
    ua: "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя",
}

export {
    defaultLanguage,
    lang,
    tooltip,
    scoreGame,
    langSelectors,
    changeTextSelectors,
    alphabet
};
