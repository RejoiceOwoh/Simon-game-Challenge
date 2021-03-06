let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function nextSequence(){
   let randomNumber = Math.floor(Math.random() * 4);
   let randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour)
   // let play = new $(randomChosenColour)
   // play.play();

   // let currentBtn = $(".btn").attr("id");
   // if (currentBtn === randomChosenColour) {
      
   // }


   
   level += 1;

   $("#level-title").text("Level " + level);

   console.log(randomNumber)
   console.log(randomChosenColour);
   console.log(gamePattern)
}

$(".btn").click(function (e) { 
   e.preventDefault();
   let userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1)

   console.log("Called by click" + userChosenColour)
});


function playSound(name) {
   
   switch (name) {
      case "red":
         const redSound = new Audio("sounds/" + name + ".mp3");
         redSound.play()
         break;
      case "blue":
         const blueSound = new Audio("sounds/" + name + ".mp3");
         blueSound.play()
         break;
      case "green":
         const greenSound = new Audio("sounds/" + name + ".mp3");
         greenSound.play()
         break;
      case "yellow":
         const yellowSound = new Audio("sounds/" + name + ".mp3");
         yellowSound.play()
         break;
   
      default:
         console.log("Hey! No code to play")
         break;
   }
}

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");

   setTimeout(() => {
      $("#" + currentColour).removeClass("pressed");
   }, 100);
}

let level = 0;
let started = false;

$(document).keypress(function (e) { 

   if (!started) {
      console.log("Key is Pressed!")

      $("#level-title").text("Level " + level);
      nextSequence()
      started = true;
   }

   
   
});

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
         setTimeout(() => {
            nextSequence()
         }, 1000);
      }
   } else {
      console.log("wrong")
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
         $("body").removeClass("game-over");
      }, 200);
      startOver()
      $("level-title").text("Game Over, Press any button to restart this game");
   }
}

function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
}

// $(document).keypress(function (e) { 
//    nextSequence()
//    console.log("Called by Keypress")
// });

// $(selector).triggerHandler(eventType);