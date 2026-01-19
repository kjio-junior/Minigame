const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord;
let timer;
let maxTime;

const initTimer = (time) => {
    clearInterval(timer);        // stop old timer
    maxTime = time;
    timeText.innerText = maxTime;

    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        } else {
            clearInterval(timer);
            alert(`Time's up! ${correctWord.toUpperCase()} was the correct word.`);
            initGame();
        }
    }, 1000);
};

const initGame = () => {
    initTimer(30);

    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();

    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();

    if (!userWord) {
        alert("Please enter a word!");
        return;
    }

    if (userWord !== correctWord) {
        alert(`Oops! ${userWord} is not a correct word.`);
    } else {
        clearInterval(timer);
        alert(`Correct! ${correctWord} is right!!`);
        initGame();
    }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
