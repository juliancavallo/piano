const WHITE_KEYS = ["a","s","d","f","g","h","j"];
const BLACK_KEYS = ["w","e","r","t","y"];
const FUNCTION_KEYS = ["+","-"];

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

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
    const octave = document.getElementById("octave").innerHTML;
    const filename = key.dataset.note + octave;
    
    const noteAudio = document.createElement("audio");
    noteAudio.src = `/notes/${filename}.mp3`;

    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add("active");
    setTimeout(() => {
        key.classList.remove("active");
    }, 500);
}

document.getElementById("btnShowLetters").addEventListener("click", () => {
    const letters = document.querySelectorAll(".letter");
    letters.forEach(l => l.classList.remove("hidden"));  

    setTimeout(() => {
        letters.forEach(l => l.classList.add("hidden"));    
    }, 4000);
});

document.getElementById("btnUp").addEventListener("click", () =>{
    changeOctave(true);
});

document.getElementById("btnDown").addEventListener("click", () =>{
    changeOctave(false);
});

function changeOctave(up){
    let pOctave = document.getElementById("octave");
    let octave = parseInt(pOctave.innerHTML, 10);

    if ((octave < 7 && up) || (octave > 1 && !up)) {
        pOctave.innerHTML = up ? ++octave : --octave;
    }
}