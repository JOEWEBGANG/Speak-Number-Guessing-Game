const msgEl = document.getElementById("msg");

// Game over variable
let isGameOver = false;

// score variable
let guesses = 0;
const scoreElement = document.getElementById("score");

// generate a random number
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum = generateRandomNumber();
console.log("number:", randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture User Speech
function onSpeak(event) {
    const msg = event.results[0][0].transcript; 
    checkNumber(msg);
    writeMessage(msg); 
}

// Listen to and Handle speech event
recognition.addEventListener("result", onSpeak);

// See in the DOM what user has spoken
function writeMessage(msg){
    const div = document.createElement('div');
    div.textContent = "You said: ";
    const span = document.createElement('span');
    span.classList.add("box");
    span.textContent = msg;
    msgEl.append(div, span);
}

// Check msg against the secret number
function checkNumber(msg) {
    const wordToNumber = {
        one: 1,
        won: 1,
        two: 2,
        to: 2,
        too: 2,
        three: 3,
        four: 4,
        for: 4,
        fore: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        ate: 8,
        nine: 9,
        ten: 10,
        tin: 10,
      };
    
      if (wordToNumber[msg]) {
        console.log(`adjusting ${msg} to ${wordToNumber[msg]}`);
        msg = wordToNumber[msg];
      } // Convert to number after adjustments
    
      const num = Number(msg);
      guesses ++;
      scoreElement.textContent = `Guesses: ${guesses}`;
  
    // Check if the spoken content is a valid number
    if (Number.isNaN(num)) {
      const div = document.createElement('div');
      div.textContent = 'That is not a valid number';
      msgEl.innerHTML = '';
      msgEl.append(div);
      return;
    }
  
    // Check the number and provide feedback
    if (num === randomNum) {
      isGameOver = true;  
      const h2 = document.createElement('h2');
      h2.textContent = `Congrats! You have guessed the number in ${guesses} tries! It was ${num}`;
  
      const button = document.createElement('button');
      button.classList.add('play-again');
      button.id = 'play-again';
      button.textContent = 'Play Again';
      // Add listener and handler to button
      button.addEventListener('click', () => window.location.reload());
  
      msgEl.innerHTML = '';
      msgEl.append(h2, button);
    } else if (num > randomNum) {
      const div = document.createElement('div');
      div.textContent = 'GO LOWER';
      msgEl.innerHTML = '';
      msgEl.append(div);
    } else {
      // if (num < randomNum)
      const div = document.createElement('div');
      div.textContent = 'GO HIGHER';
      msgEl.innerHTML = '';
      msgEl.append(div);
    }
  }

  recognition.addEventListener('end', () => {
    if (!isGameOver) {
      recognition.start();
    }
  });

  