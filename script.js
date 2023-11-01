console.log("Hello world");
let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
let ting = new Audio("ting.mp3");
let gameOverFlag = false;


let turn = "X";
changeTurn = () =>{
    if(turn=="X"){
        turn="O";
    }
    else{ 
        turn="X";
    }
}


checkDRAW = ()=>{
    let drawFalg = true;
    let arr = Array.from(document.getElementsByClassName('boxtext'));
    const BreakError = {};
    try{
        arr.forEach((element)=>{
            if(element.innerText == ""){
                drawFalg = false;
                throw BreakError;
            }
            // console.log(element);
        });
    }catch(err){
        if(err != BreakError) throw err;
    }
    return drawFalg;
}


// function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext')
    let win = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    win.forEach((e) =>{
        if((boxtext[e[0]].innerHTML === boxtext[e[1]].innerHTML) && (boxtext[e[1]].innerHTML === boxtext[e[2]].innerHTML) && (boxtext[e[0]].innerHTML !== "") ){
            document.getElementById('div_img').style='opacity : 1';
            gameOverFlag = true;
            document.querySelector('.info').innerText = boxtext[e[0]].innerHTML + " win the game";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
            music.play();
        }
    })
    
}

fun_reset = ()=>{
    let arr_boxtext = Array.from(document.getElementsByClassName('boxtext'));
    arr_boxtext.forEach((element)=>{
        element.innerText = "";
    })
    turn = "X";gameOverFlag=false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.getElementById('div_img').style='opacity : 0';
    music.pause();
    music.currentTime = 0;
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxText.innerHTML === "" && gameOverFlag==false){
            boxText.innerHTML = turn;
            changeTurn();
            ting.play();
            checkWin(); 
            if (!gameOverFlag){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            } 
            if(checkDRAW() && !gameOverFlag){
                document.getElementsByClassName("info")[0].innerText  = "game DRAW plz reset";
            };
        }
    })
})

let reset = document.getElementsByClassName("reset")[0];
reset.addEventListener('click', fun_reset);

// let box_array = Array.from(document.getElementsByClassName('boxtext'));
// box_array.forEach((element) =>{
//     element.innerText = "";