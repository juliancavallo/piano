import * as functions from './functions.js';

const WHITE_KEYS = ["a","s","d","f","g","h","j","k","l","z","x","c","v","b"];
const BLACK_KEYS = ["w","e","t","y","u","i","o","p","n","m"];
const FUNCTION_KEYS = ["+","-"];

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

document.getElementById("btnHint").addEventListener("click", () => {
      functions.showToast("Hint", `Press "Show keyboard letters" button once for show, for a few seconds, the letters binded to the piano keys.
        \nIf you press the button again while it's light-grey, it will turn white, and show the letters permanently.
        \nClicking it one more time will turn it dark-grey and hide the letters.`);
});
      

keys.forEach(key =>{
    key.addEventListener("click", () => playNote(key));
});

document.addEventListener("keydown", e => {
    if(e.repeat)
        return;

    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);
    const functionKeyIndex = FUNCTION_KEYS.indexOf(key);

    if(whiteKeyIndex > -1)
        playNote(whiteKeys[whiteKeyIndex]);

    if(blackKeyIndex > -1)
        playNote(blackKeys[blackKeyIndex]);

    if(functionKeyIndex > -1)
        changeOctave(key == "+");
});

function playNote(key){
    const filename = key.dataset.note + key.dataset.octave;
    
    const noteAudio = document.createElement("audio");
    noteAudio.src = `notes/${filename}.mp3`;

    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add("active");
    setTimeout(() => {
        key.classList.remove("active");
    }, 500);
}

var timeout;
document.getElementById("btnShowLetters").addEventListener("click", (e) => {
    const btnAction = e.target.dataset.action;
    const letters = document.querySelectorAll(".letter");

    switch(btnAction){
        case "showFew":    
            letters.forEach(l => l.classList.remove("hidden"));  
            e.target.dataset.action = "showIndef";

            e.target.classList.remove("lettersShowFew");
            e.target.classList.add("lettersShowIndef");  

            timeout = setTimeout(() => {
                letters.forEach(l => l.classList.add("hidden"));  

                e.target.dataset.action = "showFew";

                e.target.classList.remove("lettersShowIndef");
                e.target.classList.add("lettersShowFew");  
            }, 2000);

            break;

        case "showIndef":
            clearTimeout(timeout);    
            
            letters.forEach(l => l.classList.remove("hidden"));  

            e.target.dataset.action = "hide";
            
            e.target.classList.remove("lettersShowIndef");
            e.target.classList.add("lettersHide");
            break;

        case "hide":
            letters.forEach(l => l.classList.add("hidden"));  
            e.target.dataset.action = "showFew";

            e.target.classList.remove("lettersHide");
            e.target.classList.add("lettersShowFew");
            break;
    }
});

document.getElementById("btnUp").addEventListener("click", () =>{
    changeOctave(true);
});

document.getElementById("btnDown").addEventListener("click", () =>{
    changeOctave(false);
});

function changeOctave(up){
    let numberShown = document.getElementById("octave");
    let octave = parseInt(numberShown.innerHTML, 10);

    if ((octave < 6 && up) || (octave > 1 && !up)) {
        keys.forEach(key => {
            let keyOctave = key.dataset.octave;
            key.dataset.octave = up ? ++keyOctave : --keyOctave;
        });

        numberShown.innerHTML = up ? ++octave : --octave;    
    }
}