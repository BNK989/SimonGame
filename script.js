const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const playerArr = [];

function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
}

// function playTurn(){
//         nextSequence();
//     gamePattern.forEach( (color,index) => {
//         setTimeout(()=>{
//             playTune(color);
//             }, index * 1000);
//     });
// }

function playTurn() {
    // Add overlay to block user input
    $(".overlay").addClass("active");
    nextSequence();

    gamePattern.forEach((color, index) => {
        setTimeout(() => {
            playTune(color);

            // Check if it's the last iteration, then remove overlay
            if (index === gamePattern.length - 1) {
                setTimeout(() => {
                    $(".overlay").removeClass("active");
                }, (index) * 90);
            }
        }, index * 990);
    });
}

////=============================/// END OF MODIFICATIONS

function playTune(color) {
    const tune = new Audio(`./sounds/${color}.mp3`);
    tune.play();
    $(`.${color}`).addClass("pressed");
    setTimeout(() => $(`.${color}`).removeClass("pressed"), 400)
}

function restart() {
    $(".restart").addClass("pressed");
    setTimeout(() => $(".restart").removeClass("pressed"), 400);

    let q = true;
    if ($(".restartBtn").text() === "Restart") {
        q = confirm("This will restart the game. continue?");
    }

    async function clearArrays() {
        // Use async/await to make sure each array is cleared before proceeding
        await new Promise(resolve => {
            gamePattern.length = 0;
            resolve();
        });

        await new Promise(resolve => {
            playerArr.length = 0;
            resolve();
        });
    }

    if (q) {
        // Call the async function and wait for it to complete
        (async () => {
            await clearArrays();

            // Pause for one second before allowing the final line to run
            setTimeout(() => {
                playTurn();
                $(".restartBtn").text("Restart");
            }, 1000);
        })();
    }
}



function registerGame(color) {
    playerArr.push(color);
}

function checkPlayer() {
    let gameThusFar = playerArr.length;
    if (JSON.stringify(playerArr) === JSON.stringify(gamePattern.slice(0, gameThusFar))) {
        if (gameThusFar === gamePattern.length) {
            playerArr.length = 0;
            $("#level-title").css("color", "green");
            $("#level-title").text("Level: " + gamePattern.length);
            setTimeout(() => {
                playTurn();
                $("#level-title").css("color", "white")
            }, 1000);
        }
    } else {
        $("#level-title").text("GAME OVER. Press space to start again");
        $("body").toggleClass("game-over");
        setTimeout(() => $("body").toggleClass("game-over"), 999)
        tune = new Audio(`./sounds/wrong.mp3`).play();
        gamePattern.length = 0;
        playerArr.length = 0;
    }
}

//============================//

///By mouse click
$(".btn").on("click", (e) => {
    let colorName = e.currentTarget.id
    playTune(colorName);
    registerGame(colorName);
    checkPlayer();
});

//By keyboard
$("body").on("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            playTune("green");
            registerGame("green");
            checkPlayer();
            break;
        case "ArrowLeft":
            playTune("red");
            registerGame("red");
            checkPlayer();
            break;
        case "ArrowDown":
            playTune("yellow");
            registerGame("yellow");
            checkPlayer();
            break;
        case "ArrowRight":
            playTune("blue");
            registerGame("blue");
            checkPlayer();
            break;
        case " ":
            restart();
            break;
        default:
            break;
    }
}
);

$(".restart").on("click", restart);


