const buttons = ["green", "red", "yellow", "blue"];
let canClick = false;
let sequenceLength = 3;
let levelSequence = [];
let playerInput = []; //Feel free to use this array to store the player input. If you want to go about it another way, feel free to do so.

//If you want to add more scoped variables, add them here.


function startGame() {
  sequenceLength = 3;
  document.getElementById("title").innerHTML = "Simon says..";

  startLevel(100);
}

function startLevel(timeBeforeLevelStarts = 700) {
  setTimeout(() => {
    playerInput = [];
    levelSequence = [];
    canClickTimeout(sequenceLength * 1000);

    //Add code here that will choose random buttons and highlight the buttons in the sequence. You can use the highlightButton function to do this.
    //You should also use some form of timeout to delay the highlighting of each button.

    //Pseudo code / Steps:
    //  For i < sequenceLength
    //  Choose a random button from the buttons array
    //  Highlight the button by using the highlightButton function and passing in the button (example button[0])
    //  Add the button to the levelSequence array
    //  Wait 1 second (a tip is to wrap the content of the loop in a timeout, or use promises)
    //  Increment i and repeat

    //Extra challenges:
    // 1. Make sure the same button isn't chosen twice in a row.
    // 2. The player loses if it takes more than 3 seconds between button presses. Feel free to add this logic to a separate function and call it when the player presses a button.

    //EXAMPLE CODE: 
    let lastClr = ""; //Challenge 1
    for (let i = 0; i < sequenceLength; i++) {
      setTimeout(() => {
        let randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        
        while (randomButton === lastClr) {//Challenge 1
          randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        }
        lastClr = randomButton;//Challenge 1

        highlightButton(randomButton);
        levelSequence.push(randomButton);
      }, i * 1000);
    }

  }, timeBeforeLevelStarts);
}

function btnClicked(clr) {
  if (!canClick) return;
  canClickTimeout(700);
  highlightButton(clr);

  //Add code here to handle what happens when a button is clicked.
  //Either you check the input every time the player presses a button, or you check it when the player has pressed the last button in the sequence.

  //EXAMPLE CODE:
  playerInput.push(clr);
  if (playerInput.length === levelSequence.length) {
    checkPlayerInput();
  }
}

function checkPlayerInput() {
  // Add your code here to check if the player input matches the level sequence. If it does, increment the level and start the next level. 
  //If not, call the gameOver function and add logic to reset the game.

  //EXAMPLE CODE:
  if (levelSequence.every((val, index) => val === playerInput[index])) {
    sequenceLength++;
    startLevel();
  } else {
    gameOver();
  }
}

function gameOver() {
  document.getElementById("title").innerHTML = "Game Over";
  sequenceLength = 3;
}


/* Helper functions */
function highlightButton(clr) {
  let clickedElement = document.getElementById(clr);
  clickedElement.style.transform = "scale(1.2)";
  clickedElement.style.zIndex = "99";

  setTimeout(() => {
    clickedElement.style.transform = "scale(1)";
  }, 500);

  setTimeout(() => {
    clickedElement.style.zIndex = "1";
  }, 700);
}

function canClickTimeout(time = 1000) {
  canClick = false;
  setTimeout(() => {
    canClick = true;
  }, time);
}