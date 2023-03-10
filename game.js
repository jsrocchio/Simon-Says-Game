var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).on("keydown", function () {
    if (level == 0) {
        $("h1").text("Level 0");
        setTimeout(function () {
            nextSequence();
        }, 200);
    }
    else { }
})

$(".btn").click(function () {
    var userChosenColour = this.getAttribute("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer((userClickedPattern.length - 1));
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    }
    else {
        $("h1").html("Game Over! Press Any Key to Restart!");
        var audioFail = new Audio("sounds/wrong.mp3");
        audioFail.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $(document).on("keydown", function () {
                startOver();
        });
    }
    if (userClickedPattern.length == gamePattern.length && userClickedPattern[userClickedPattern.length - 1] == gamePattern[gamePattern.length - 1]) {
        setTimeout(function () {
            nextSequence();
        }, 1000)
    } else { }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); //0-3
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
