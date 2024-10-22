let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let winMessage = document.querySelector("#message");
let para = document.querySelector("p");
let msgContainer = document.querySelector(".messageContainer");
let newGame = document.querySelector("#newGame");
let turnO = true;
let count = 0;
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("The box was clicked")
    if (turnO) {
      box.innerText = "O";

      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      showDrawMessage();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        // console.log("Winner",pos1)
        showMessage(pos1);
      }
    }
  }
};
const showMessage = (pos1) => {
  winMessage.innerText = `Congratulations! ${pos1} you are the winner`;

  disableBoxes();
  msgContainer.classList.remove("hide");
};
const showDrawMessage = () => {
  winMessage.innerText = `The Match is Draw! Try again`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
