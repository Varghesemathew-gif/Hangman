const wordList = ["hyundai", "toyota", "tesla", "byd", "ferrari"];
const chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
let display = Array(chosenWord.length).fill("_");
let lives = 7;
let guessedLetters = [];

const hangmanStages = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

function updateDisplay() {
  document.getElementById("hangman-art").textContent = hangmanStages[7 - lives];
  document.getElementById("word-display").textContent = display.join(" ");
  document.getElementById("message").textContent = "";
}

function handleGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.toLowerCase();
  input.value = "";

  if (!guess.match(/[a-z]/) || guess.length !== 1) {
    document.getElementById("message").textContent = "❌ Enter a single letter.";
    return;
  }

  if (guessedLetters.includes(guess)) {
    document.getElementById("message").textContent = "🔁 You already guessed that letter.";
    return;
  }

  guessedLetters.push(guess);

  if (chosenWord.includes(guess)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === guess) {
        display[i] = guess;
      }
    }
  } else {
    lives--;
  }

  updateDisplay();

  if (!display.includes("_")) {
    document.getElementById("message").textContent = "🎉 You win!";
    disableInput();
  } else if (lives === 0) {
    document.getElementById("message").textContent = 💀 You lose! The word was "${chosenWord}".;
    disableInput();
  }
}

function disableInput() {
  document.getElementById("guess-input").disabled = true;
  document.querySelector("button").disabled = true;
}

window.onload = updateDisplay;