var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

$(".btn").click(function() {
	if(!started){
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 500);
    started = true;
  }
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


var started = false;
$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
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
  $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function checkTouchDevice() {
//    return 'ontouchstart' in document.documentElement;
// }

// if (checkTouchDevice()) {
//   $(document).on("touchstart", function() {
//          if(!started){
//            $("#level-title").text("Level " + level);
//            setTimeout(function () {
//              nextSequence();
//            }, 500);
//            started = true;
//      });
// }else{
//     if(!started){
//       $("#level-title").text("Level " + level);
//       setTimeout(function () {
//         nextSequence();
//       }, 500);
//       started = true;
//     }
// }

// if ("ontouchstart" in document.documentElement)
// {
//   $(document).on("touchstart", function() {
//       if(!started){
//         $("#level-title").text("Level " + level);
//         setTimeout(function () {
//           nextSequence();
//         }, 500);
//         started = true;
//   });
// }


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
}
