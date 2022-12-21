
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keydown(function () { 
    if(!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});


$(".btn").click(function () { 
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    console.log(userClickedPattern, gamePattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = []; //?
    level++;
    $("#level-title").text(`level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(randomNumber, randomChosenColor);
    
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");  //.delay(100).removeClass();
    setTimeout( function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function playSound(currentColor) {
    var sound = new Audio(`sounds/${currentColor}.mp3`);
    sound.play();
}

function startOver() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
}

