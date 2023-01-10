const buttons = ["green", "red", "yellow", "blue"];
let canClick = false;
let sequenceLength = 3;
let levelSequence = [];
let playerInput = []; //Feel free to use this array to store the player input. If you want to go about it another way, feel free to do so.

//If you want to add more scoped variables, add them here.

/* 
  Your challenge is to finish the code to make this a working 'simon says' game.

  When the game starts the game should highlight the buttons in a random order, once the order has been shown to the player,
  the player then has to try to remember the sequence and click the buttons in the correct order.

  If the player completes the sequence correctly, the game should increment the level and show the player a longer sequence.
  If the player fails, the game should end and the player should be able to start a new game.

  -In the startLevel function you will need to add logic that will choose random buttons and highlight them in the sequence.
  -In the button clicked function you need to store the players input, and once they have clicked enough buttons, 
  you need to check if the player input matches the level sequence.
  -In the checkPlayerInput function you need to check if the player input matches the level sequence. If it does, 
  increment the level and start the next level. Call this function from the button clicked function, once the player has clicked enough buttons.
  -If the player fails, call the gameOver function and add logic to reset the game.
*/

function startGame() {
  sequenceLength = 3;
  document.getElementById("title").innerHTML = "Simon says..";

  startLevel(500);
}

function startLevel(timeBeforeLevelStarts = 700) {
  setTimeout(() => {
    playerInput = [];
    levelSequence = [];
    canClickTimeout(sequenceLength * 1000);

    /* 
    Add code here that will choose random buttons and highlight the buttons in the sequence. 
    You can use the highlightButton function to for the highlight functionality.
    You should also use some form of timeout to delay the highlighting of each button so that they don't all highlight at the same time.

    Pseudo code / Steps:
      For i < length of the sequence
      Choose a random button from the buttons array to highlight.
      Highlight the button by using the highlightButton function and passing in the button (example button[0])
      Add the button to the levelSequence array
      Wait 1 second (a tip is to wrap the content of the loop in a timeout, or use promises)
      Increment i and repeat

    Extra challenges:
     1. Make sure the same button isn't chosen twice in a row.
     2. When the player fails, tell the player how many 'levels' they cleared. */

    //EXAMPLE SOLUTION: 
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

  //EXAMPLE SOLUTION:
  playerInput.push(clr);
  if (playerInput.length === levelSequence.length) {
    checkPlayerInput();
  }
}

function checkPlayerInput() {
  // Add your code here to check if the player input matches the level sequence. If it does, increment the level and start the next level. 
  //If not, call the gameOver function and add logic to reset the game.

  //EXAMPLE SOLUTION:
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