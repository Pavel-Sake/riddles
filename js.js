const riddless = [
    {
        condition: 'Висит болтается, на Х начинается',
        answer: 'хвост',
        hint: 'состоит из 4 букв',
        isActive: true
    },
    {
        condition: 'Не ездок, а со шпорами,\n' +
            'Не будильник, а всех будит.',
        answer: 'петух',
        hint: 'похож на тебя',
        isActive: true,
    },
    {
        condition: 'Распускает хвост павлином,\n' +
            'Ходит важным господином,\n' +
            'По земле ногами - стук,\n' +
            'Как зовут его - ...',
        answer: 'индюк',
        hint: 'подсказка3',
        isActive: true,
    },
    {
        condition: 'Две полоски на снегу\n' +
            'Оставляют на бегу.',
        answer: 'лыжи',
        hint: 'используют зимой',
        isActive: true
    },
    {
        condition: 'Белые горошки на зелёной ножке.',
        answer: 'ландыш',
        hint: 'это цветок',
        isActive: true,
    },
    {
        condition: 'Живет в норке, грызет корки.\n' +
            'Короткие ножки; боится кошки.',
        answer: 'мышь',
        hint: 'боится кошки',
        isActive: true,
    },
    {
        condition: 'Зеленые мы, как трава,\n' +
            'Наша песенка: "Ква-ква',
        answer: 'Лягушка',
        hint: 'квакает',
        isActive: true,
    },
    {
        condition: 'Ног нет, а хожу,\n' +
            'Рта нет, а скажу,\n' +
            'Когда спать, когда вставать,\n' +
            'Когда работу начинать.',
        answer: 'часы',
        hint: 'бывают механические и электронные',
        isActive: true,
    },
];

const textAddRiddleH1 = document.querySelector('.textAddRiddleH1');

const backRiddles = document.querySelector('.back__riddles');
const addRiddlePageBack = document.querySelector('.addRiddlePage__back');

const writeRiddle = document.querySelector('.writeRiddle');
const writeHint = document.querySelector('.writeHint');
const writeAnswer = document.querySelector('.writeAnswer');
const createRiddleButton = document.querySelector('.addCreatedRiddleButton');

let currentRiddle = null;

const startPage = document.querySelector('.startPage');
const riddlesShow = document.querySelector('.riddles');
const addRiddlePage = document.querySelector('.addRiddlePage');
const showBlockAddRiddlesButton = document.querySelector('.startPage__add-ridle-button');

const playButton = document.querySelector('.startPage__tobegin-riddles-button');
const conditionRiddleElement = document.querySelector('.screen');
const answerButton = document.querySelector('.answer');
const textAnswer = document.querySelector('.text__answer');
const hintScreen = document.querySelector('.hint__screen');
const hitnButton = document.querySelector('.hint');
const nextRiddleButton = document.querySelector('.ignore-riddles');
const showAnswer = document.querySelector('.showAnswer');

const formRiddleElement = document.querySelector('.formRiddle');

showBlockAddRiddlesButton.addEventListener('click', handleClickShowBlockAddRiddlesButton);

playButton.addEventListener('click', handleClickPlayButton);
showAnswer.addEventListener('click', hendleClickShowAnswerButton);
nextRiddleButton.addEventListener('click', handleClickNextRiddle);
hitnButton.addEventListener('click', handleClickHintButton);
answerButton.addEventListener('click', handleClickAnswerButton);

backRiddles.addEventListener('click', handleClickRiddlesBack);
addRiddlePageBack.addEventListener('click', handleClickRiddlesPageBack);

formRiddleElement.addEventListener('submit', handleClickCreateRiddleButton);

writeRiddle.value = '';

function handleClickRiddlesBack(event) {
    riddlesShow.classList.add('riddles--hidden');
    startPage.classList.remove('blockHidden');
}

function handleClickRiddlesPageBack(event) {
    startPage.classList.remove('blockHidden');
    addRiddlePage.classList.add('addRiddlePage--hidden');
}

function handleClickCreateRiddleButton(event) {
    event.preventDefault();

    let tec = 0;

    for (let i = 0; i < riddless.length; i++) {
        let currentPuzzleCondition = (riddless[i].condition.toLocaleLowerCase());

        if (currentPuzzleCondition === (writeRiddle.value.toLocaleLowerCase())) {
            tec++;
        }
    }

    if (tec === 0) {
        const newRiddle = {
            condition: writeRiddle.value,
            answer: writeAnswer.value,
            hint: writeHint.value,
            isActive: true,
        };

        riddless.push(newRiddle);
        updatePuzzleStrings();

        textAddRiddleH1.textContent = 'Загадка добавлена';
        textAddRiddleH1.style.color = '#38cb13';
        textAddRiddleH1.classList.add('textAddRiddleH1--show');
    } else {
        textAddRiddleH1.textContent = 'Загадка уже имеется';
        textAddRiddleH1.style.color = '#ED0F0B';
        textAddRiddleH1.classList.add('textAddRiddleH1--show');
    }

    setTimeout(animationCreateRiddle, 3000);
}

function animationCreateRiddle() {
    textAddRiddleH1.classList.remove('textAddRiddleH1--show');
}

function updatePuzzleStrings() {
    writeRiddle.value = '';
    writeAnswer.value = '';
    writeHint.value = '';
}

function handleClickShowBlockAddRiddlesButton(event) {
    startPage.classList.add('blockHidden');
    addRiddlePage.classList.remove('addRiddlePage--hidden');
}

function hendleClickShowAnswerButton(event) {
    hintScreen.textContent = 'Это' + ' ' + currentRiddle.answer;
    console.log(riddless);
}

function handleClickNextRiddle(event) {
    currentRiddle = getNextRiddle();
    conditionRiddleElement.textContent = currentRiddle.condition;
    textAnswer.value = '';

    hintScreen.classList.remove('answer__not');
    hintScreen.classList.remove('hint__screen__class');
    hintScreen.classList.remove('answer__right');
    hintScreen.textContent = '';
}

function handleClickPlayButton(event) {
    currentRiddle = getNextRiddle();
    conditionRiddleElement.textContent = currentRiddle.condition;
    textAnswer.value = '';

    riddlesShow.classList.remove('riddles--hidden');
    startPage.classList.add('blockHidden');

    document.querySelector('.answer').disabled = false;
    document.querySelector('.hint').disabled = false;
    document.querySelector('.ignore-riddles').disabled = false;
}

function getNextRiddle() {
    const activeRiddles = getActiveRiddles();
    const rand = Math.floor(Math.random() * activeRiddles.length);
    const randomRiddle = activeRiddles[rand];

    return randomRiddle;
}

function getActiveRiddles() {
    const activeRiddles = [];

    for (let i = 0; i < riddless.length; i++) {
        if (riddless[i].isActive) {
            activeRiddles.push(riddless[i]);
        }
    }

    return activeRiddles;
}

function setIsActiveInCurrentRiddle(value) {
    currentRiddle.isActive = value;
}

function handleClickAnswerButton(event) {
    const correctAnswerRiddles = currentRiddle.answer;
    const titleText = (textAnswer.value.toLocaleLowerCase());


    if (titleText === correctAnswerRiddles) {
        showCorrectAnswer('правильно', 'след');
        nextRiddleButton.textContent = 'след';
        setIsActiveInCurrentRiddle(false);

        hintScreen.classList.remove('hint__screen__class');
        hintScreen.classList.remove('answer__not');
        hintScreen.classList.add('answer__right');
    } else {
        showCorrectAnswer('неправильно');
        nextRiddleButton.textContent = 'пропустить';

        hintScreen.classList.remove('hint__screen__class');
        hintScreen.classList.remove('answer__not');
        hintScreen.classList.add('answer__not');
    }
}

function showCorrectAnswer(correctAnswer, nameButton = 'простить') {
    hintScreen.textContent = correctAnswer;
    nextRiddleButton.textContent = nameButton;
}

function handleClickHintButton(event) {
    hintScreen.textContent = currentRiddle.hint;
    hintScreen.classList.add('hint__screen__class');
}
