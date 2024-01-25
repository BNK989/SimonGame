const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const playerArr = [];

function nextSequence(){
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
}

function playTune(color){
    let tune = new Audio(`./sounds/${color}.mp3`);
    tune.play();
    $(`.${color}`).addClass("pressed");
    setTimeout(()=>$(`.${color}`).removeClass("pressed"),400)
}

$(".btn").on("click", (e)=>{ 
    let colorName = e.currentTarget.id
    playTune(colorName);
    registerGame(colorName);
    checkPlayer();
});


function startGame(){
    $(".restartBtn").text("Restart");

    nextSequence();
    gamePattern.forEach( (color,index) => {
        setTimeout(()=>{
            playTune(color);
            }, index * 1000);
    });
}

$("body").on("keydown", (e) => {
    if(e.key.toLowerCase() === "a"){
        startGame()
    } else {
        switch (e.key){
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
});

$(".restart").on("click", restart );


function restart(){
    $(".restart").addClass("pressed");
    setTimeout(()=>$(".restart").removeClass("pressed"),400);
    let qReq;
    $(".restartBtn").text() === "Start" ? qReq = false : qReq = true;

    let qu = true;
    if( qReq ) {
        qu = confirm("This will restart the game. continue?");
    }
    
    if(qu){
        gamePattern.length = 0;
        playerArr.length = 0;
        startGame()
    }  
    
}

function registerGame(color){
    playerArr.push(color);
    $(".playerArr").append(" " + color )
}

function checkPlayer(){
    let gameThusFar = playerArr.length;
    if  (JSON.stringify(playerArr) === JSON.stringify(gamePattern.slice(0, gameThusFar))){
        if(gameThusFar === gamePattern.length){ 
            playerArr.length = 0;
            $("#level-title").css("color","green");
            $("#level-title").text("Level: " + gamePattern.length);
            setTimeout(()=>{
                startGame();
                $("#level-title").css("color","white")
            },1000);
        }
    }else{
        $("#level-title").text("GAME OVER. Press A to start again");
        $("body").toggleClass("game-over");
        setTimeout(()=>$("body").toggleClass("game-over"),999)
        tune = new Audio(`./sounds/wrong.mp3`).play();
        gamePattern.length = 0;
        playerArr.length = 0;
    }
}
