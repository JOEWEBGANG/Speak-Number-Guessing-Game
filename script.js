const msgEl = document.getElementById("msg");

// generate a random number
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum = generateRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture User Speech
function onSpeak(event) {
    const msg = event.results[0][0].transcript;
    writeMessage(msg);
}

// Listen to and Handle speech event
recognition.addEventListener("result", onSpeak);

// See in the DOM what user has spoken
const div = document.createElement('div');
const span = document.createElement('span');
span.classList.add("box");
span.textContent = msg;
function writeMessage(msg){
    msgEl.innerHTML = `
    <div> You said: </div> 
    <span class="box"> ${msg}</span>
    `;
}