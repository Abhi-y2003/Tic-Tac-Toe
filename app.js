let boxes  = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;  //playerX playerO

const resetGame =() =>{
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const disableBoxes =() =>{
    for(let box of boxes){
        box.classList.add("disabled");
    }
}

const enableBoxes =() =>{
    for(let box of boxes){
        box.classList.remove("disabled");
        box.innerText ="";
    }
}



const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box)=>{
    box.addEventListener("click" , ()=>{
        console.log("box is clicked");
        if (!box.innerText) { // Check if the box is empty
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }else{
            box.innerText = "O";
            turnX = true;
        }
        }

        checkWinner();
    })
})

const checkWinner =()=>{
    let isBoardFull = true;

    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText; 
        let pos3 = boxes[pattern[2]].innerText

        if(pos1 ==="" || pos2 ==="" || pos3 ===""){
            isBoardFull = false;
            continue;
        }
        if(pos1 == pos2 && pos2 == pos3){
            showWinner(pos1);
            disableBoxes();
            scrollToTop();
            confetti();
            return;
        }

       
}
if(isBoardFull){
    tieGame();
    scrollToTop();
}
}


const showWinner =(winner) =>{
    msg.innerText = `congratulations!! \n ${winner} is the Winner `;
    msgContainer.classList.remove("hide");
    

}

const tieGame =() =>{
    msg.innerText = `It's a tie.` 
    msgContainer.classList.remove("hide");
    disableBoxes();
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

const scrollToTop = () =>{
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0,0);
}