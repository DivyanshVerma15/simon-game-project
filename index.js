
var buttoncolors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];

var userClickedPattern = [];


var level = 0;

var started = false;

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    
    $("." + currentColour).addClass("pressed");

    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


function nextSequence() {                                            
                                                                     
    userClickedPattern = [];
    
    level++;

   $("#level-title").text("Level "+ level );
    
    var Num =  Math.random()*4 ;

    var randomNum = Math.floor(Num);

    var randomChosenColour = buttoncolors[randomNum];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
   playSound(randomChosenColour);

   
}


$(document).keypress(function() {
    if (!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})





$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);

})

function startOver() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
}

    
function checkAnswer(currentLevel) {
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000)
        }
    }

    else{
        
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over")

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

      
}
}





















