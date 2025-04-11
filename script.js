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


}

// Listen to and Handle speech event
recognition.addEventListener("result", onSpeak);