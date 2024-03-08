const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
questionTag = document.querySelector(".question span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
restartBtn = document.getElementById("restart"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

var cheer = document.getElementById("cheerAudio"); 
function cheering(){
    cheer.pause();
    cheer.currentTime = 0;
    cheer.play(); 
}

  // Get the query string from the URL
  var queryString = window.location.search;
    
    // Remove the leading "?" character
    queryString = queryString.substring(1);
    
    // Split the query string into an array of parameter=value pairs
    var params = queryString.split("&");
    
    // Create an object to store the parameters
    var paramMap = {};
    
    // Iterate through the parameter=value pairs and store them in the object
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split("=");
        paramMap[param[0]] = decodeURIComponent(param[1]);
    }
    
    // Now you can access the parameters using paramMap
    var q = paramMap["q"];
    q = q-1;
    if(q < 0 || q == NaN){
      q=0;
    }


    var currentUrl = window.location.href;
    var baseUrl = currentUrl.split('?')[0];

    
    if(baseUrl == window.location.href){
        window.location.href = baseUrl+"?q=1";
      }
   // alert(q);

function randomWord() {
    q = q+1;
    // window.location.href = baseUrl+"?q="+q;
    // let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    let ranItem = wordList[q-1];
    word = ranItem.word;
    // maxGuesses = word.length >= 5 ? 8 : 6;
    maxGuesses = 1000000;


        
      

    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    questionTag.innerHTML = ranItem.question;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }

    if(wordList.length == q){
        
        var button = document.getElementById('nextBtn');

        // Check if the button element exists
        if (button) {
            // Hide the button by setting its display property to 'none'
            button.style.display = 'none';
        }
    }

    cheer.pause();
    cheer.currentTime = 0;
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                    correctAudio();
                }
            }
        } else {
            wrongAudio();
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

   

    if(correctLetters.length === word.length) {
        cheering();
    }

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } 
        // else if(maxGuesses < 1) {
        //     alert("Game over! You don't have remaining guesses");
        //     for(let i = 0; i < word.length; i++) {
        //         inputs.querySelectorAll("input")[i].value = word[i];
        //     }
        // }
    }, 100);
}


var ok = document.getElementById("correctAudio"); 

var wrong = document.getElementById("wrongAudio");  



// var dragLbl = document.getElementById("dragLbl"); 
function correctAudio() { 
    ok.pause();
    ok.currentTime = 0;
    // cheer.pause();
    // cheer.currentTime = 0;
    // $('#confettis').show();
    // $('#myModal').modal('show');
    ok.play(); 
    // cheer.play(); 
} 
var bgAudio = document.getElementById("bgAudio"); 
function playBg(){
    bgAudio.pause();
    bgAudio.currentTime = 0;
    bgAudio.play(); 
  }
  



function wrongAudio() {
    wrong.pause();
    wrong.currentTime = 1; 
    wrong.play(); 
} 

function restartgame(){
    window.location.href = baseUrl+"?q=1";
}
// restartBtn.addEventListener("click", restartgame);
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());