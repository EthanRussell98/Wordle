let theWord = "";
let theDefinition = "";
// cycleNumber is used to define what the current input column is
let cycleNumber = 1;
// cycleLetter is used to define what the current input row is
let cycleLetter = "A";

async function getRandomWord(){
    // Gets a random word with length equal to wordLength
        theWord = await fetch('https://random-word-api.herokuapp.com/word?length=' + 5)
        .then(res => res.json())
         .then(data => {return String(data)})
        // Checks the word with a dictionary api to make sure it exists
           fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + theWord)
                .then(res => res.json())
                .then(data => {
                    // Title is true if the word doesn't exist
                    data.title ? getRandomWord() : useWord(data[0].word, (data[0].meanings[0].definitions[0].definition))
                    })              
}
// Call Function to get a Word
getRandomWord(); 

function useWord(word, definition){
    theWord = word;
    theDefinition = definition;
}
// Inputs letter clicked on keyboard to the cycleNumber column and cycleLetter row
function inputLetter(letter){  
    switch(cycleNumber) {
        case 1:
            document.getElementById(`Box${cycleLetter}1`).innerHTML = letter;
            if(letter!=null){document.getElementById("Box"+ cycleLetter +cycleNumber).style.borderColor = "#787c7e";}
          break;
        case 2:
            document.getElementById(`Box${cycleLetter}2`).innerHTML = letter;
            if(letter!=null){document.getElementById("Box"+ cycleLetter +cycleNumber).style.borderColor = "#787c7e";}
          break;
        case 3:
            document.getElementById(`Box${cycleLetter}3`).innerHTML = letter;
            if(letter!=null){document.getElementById("Box"+ cycleLetter +cycleNumber).style.borderColor = "#787c7e";}
        break; 
        case 4:
            document.getElementById(`Box${cycleLetter}4`).innerHTML = letter;
            if(letter!=null){document.getElementById("Box"+ cycleLetter +cycleNumber).style.borderColor = "#787c7e";}
        break;
        case 5:
            document.getElementById(`Box${cycleLetter}5`).innerHTML = letter;
            if(letter!=null){document.getElementById("Box"+ cycleLetter +cycleNumber).style.borderColor = "#787c7e";}
        break; 
      }
      if(letter!=null){cycleNumber++}
}
// Called when backspace button is pressed to remove the previous letter placed
function backspace(){
    if(cycleNumber>1 && cycleNumber<=6){
    --cycleNumber;
    document.getElementById("Box"+ cycleLetter + cycleNumber).style.borderColor = "#d3d6da";
    inputLetter(null);
    }
    else if (cycleNumber>5){
        cycleNumber = 5;
        inputLetter(null);
    }
}
// Called when enter button is pressed
function enter(){
    (cycleNumber<6) ? popup("Word too short"): checkWord();
}
// Checks the word exists with dictionary api
function checkWord(){
    let inputWord = "";
    for(i=1; i<=5; i++){
        inputWord += document.getElementById("Box"+ cycleLetter + i).innerHTML;
    }
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + inputWord)
        .then(res => res.json())
        .then(data => {
            // Checks the word exists
            data.title ? popup("Word not found") :  compareWords(inputWord.toLowerCase());
        })
}
// Compares the input word to the generated word
function compareWords(myWord){

    
    for(i=0; i<5; i++){
        if(myWord.charAt(i) == theWord.charAt(i)){
            document.getElementById("Box"+ cycleLetter + (i+1)).style.backgroundColor = "#6aaa64";
            document.getElementById("Box"+ cycleLetter + (i+1)).style.borderColor = "#6aaa64";
            document.getElementById("Box"+ cycleLetter + (i+1)).style.color = "white";
            document.getElementById("Key_" + myWord.charAt(i)).style.backgroundColor = "#6aaa64";
            document.getElementById("Key_" + myWord.charAt(i)).style.color = "white";
            continue
        }
        for(x=0; x<5; x++){
            if(myWord.charAt(i) != theWord.charAt(i) && myWord.charAt(i) == theWord.charAt(x)){
                document.getElementById("Box"+ cycleLetter + (i+1)).style.backgroundColor = "#c9b458";
                document.getElementById("Box"+ cycleLetter + (i+1)).style.borderColor = "#c9b458";
                document.getElementById("Box"+ cycleLetter + (i+1)).style.color = "white";
                document.getElementById("Key_" + myWord.charAt(i)).style.backgroundColor = "#c9b458";
                document.getElementById("Key_" + myWord.charAt(i)).style.color = "white";
                break
            }
            else if (myWord.charAt(i) != theWord.charAt(i) && myWord.charAt(i) != theWord.charAt(x)){
                document.getElementById("Box"+ cycleLetter + (i+1)).style.backgroundColor = "#787c7e";
                document.getElementById("Box"+ cycleLetter + (i+1)).style.color = "white";
                document.getElementById("Key_" + myWord.charAt(i)).style.backgroundColor = "#787c7e";
                document.getElementById("Key_" + myWord.charAt(i)).style.color = "white";
            }
        }
    }
    (myWord == theWord) ? gameOverPopup(true) : nextLine();
}
// Changes the letter to start on a new line
function nextLine(){
    switch(cycleLetter) {
        case "A":
            cycleLetter = "B";
            cycleNumber = 1;
          break;
        case "B":
            cycleLetter = "C";
            cycleNumber = 1;
          break;
        case "C":
            cycleLetter = "D";
            cycleNumber = 1;
        break;
        case "D":
            cycleLetter = "E";
            cycleNumber = 1;
        break;
        case "E":
            cycleLetter = "F";
            cycleNumber = 1;
        break;
        case "F":
            gameOverPopup(false);
        break;
    }
}
// Disaplys a message
function popup(message){
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popupMessage").innerHTML = message;
    setTimeout(hidePopup, 1000);
    function hidePopup(){
        document.getElementById("popup").style.display = "none";
    }
}
// Displays when the game is over
// Either win or lose
function gameOverPopup(won){
    if (won){
    document.getElementById("gameOver").style.display = "flex";
    document.getElementById("gameOverHeader").innerHTML = "Congratulations!";
    document.getElementById("gameOverWord").innerHTML = "The word is: " + theWord;
    document.getElementById("gameOverDefinition").innerHTML = "Definition : " + theDefinition;
    }
    else{
    document.getElementById("gameOver").style.display = "flex";
    document.getElementById("gameOverHeader").innerHTML = "Game Over!";
    document.getElementById("gameOverWord").innerHTML = "The word is: " + theWord;
    document.getElementById("gameOverDefinition").innerHTML = "Definition : " + theDefinition;
    }
}
