var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document.querySelector("button")).click(function() {
	if(!started){
    setTimeout(function () {
      nextSequence();
    }, 500);
    started = true;
		$(".start-button").hide();
  }
});

$(document).keypress(function() {
  if(!started){
    setTimeout(function () {
      nextSequence();
    }, 500);
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
	playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
 }

function checkAnswer(userClick) {
  var wrong = false;
  if(userClickedPattern[userClick] === gamePattern[userClick]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }else{
    var wrongA = new Audio("sounds/wrong.mp3");
		wrongA.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  started = false;
  level = 1;
  gamePattern = [];
	$(".start-button").show();
}
