const words = ["javascript", "html", "css", "python", "ruby", "java"];
let chosenWord = "";
let guessedWord = [];
let incorrectLetters = []; // Array to store incorrectly guessed letters

// Array of hangman image URLs
const hangmanImages = [
    "https://www.oligalma.com/downloads/images/hangman/hangman/4.jpg",
    "https://www.oligalma.com/downloads/images/hangman/hangman/5.jpg",
    "https://www.oligalma.com/downloads/images/hangman/hangman/6.jpg",
    "https://www.oligalma.com/downloads/images/hangman/hangman/7.jpg",
    "https://www.oligalma.com/downloads/images/hangman/hangman/8.jpg",
    "https://www.oligalma.com/downloads/images/hangman/hangman/9.jpg",
    "https://www.oligalma.com/downloads/images/hangman/hangman/10.jpg"
];

function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = [];
    for (let i = 0; i < chosenWord.length; i++) {
        guessedWord.push("_");
    }
    displayWord();
}

function displayWord() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = guessedWord.join(" ");
}

function checkLetter(letter) {
    let found = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            guessedWord[i] = letter;
            found = true;
        }
    }
    if (!found) {
        incorrectLetters.push(letter); // Add incorrect letter to array
        updateHangmanImage();
        updateIncorrectLettersDisplay(); // Update incorrect letters display
    }
    displayWord();
    checkWinOrLoss();
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image").querySelector("img");
    hangmanImage.src = hangmanImages[incorrectLetters.length - 1]; // Use length of incorrect letters array
}

function updateIncorrectLettersDisplay() {
    const incorrectLettersDisplay = document.getElementById("incorrect-letters");
    incorrectLettersDisplay.textContent = "Incorrect Letters: " + incorrectLetters.join(", ");
}

function checkWinOrLoss() {
    if (guessedWord.join("") === chosenWord) {
        alert("Congratulations! You guessed the word correctly!");
        chooseWord();
    } else if (incorrectLetters.length === 6) { // Check length of incorrect letters array
        alert("Sorry, you lost! The word was " + chosenWord + ".");
        chooseWord();
    }
}

function setupLetterButtons() {
    const letterButtons = document.getElementById("letter-buttons");
    letterButtons.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", function() {
            checkLetter(letter);
            button.disabled = true;
        });
        letterButtons.appendChild(button);
    }
}

chooseWord();
setupLetterButtons();
