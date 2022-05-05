var gameStarted = false;    // Game is not started yet.

var level = 0;  // Level is 0 when game is not started.

var buttons = ["red", "green", 'yellow', 'blue'];     // id of all buttons for the computer to click

var computerArray = [];     // register all computer moves in this.

var playerArray = [];     // register all player moves in this.


// PLAY GAME :

$(document).on("keydown", () => {
    if (!gameStarted) {
        // $("#level-title").text("Level " + level);
        computerTurn();
        gameStarted = true;
    }
});

// To run this on mobiles and tablets.
("h1").on("touchend", (event) => {
            if (!gameStarted) {
                console.log(event)
                // $("#level-title").text("Level " + level);
                computerTurn();
                gameStarted = true;
            }
        });

$(".btn").on("click", (event) => {
    var playerString = event.target.id;
    // console.log(playerString);
    playerArray.push(playerString);
    console.log(playerArray)
    playSound(playerString);
    playerClickAnimation(event);
    checkArray(playerArray.length - 1);
})

function playerClickAnimation(event) {
    // add class when button pressed.
    $("#" + event.target.id).addClass("pressed");

    // remove class after 0.1sec
    setTimeout(function () {
        $("#" + event.target.id).removeClass("pressed")
    }, 100);
}

function checkArray(currentLevel) {
    if (computerArray[currentLevel] === playerArray[currentLevel]) {
        if (computerArray.length === playerArray.length) {
            setTimeout(computerTurn,1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 300);

        startOver();
    }
}

function startOver() {
    level = 0;
    computerArray = [];
    gameStarted = false;
}






// ----- Random Number Code is OK. -----
function randomNumber() {

    var randomNum = Math.floor(Math.random() * 4);

    computerArray.push(buttons[randomNum]);
    
    $("#" + buttons[randomNum]).fadeIn(100).fadeOut(100).fadeIn(100);
    // computerClickAnimation(randomNum);
    playSound(buttons[randomNum]);
}

function computerTurn() {
    playerArray = [];
    level++;
    $("#level-title").text("Level " + level);
    
    randomNumber();
    console.log(computerArray);
    
}
function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}
