//Fix later: Add ability to string together operations

const sortInput = (input) => {
  !isNaN(input) || (input == "." && !calcScreen.innerText.includes(".")) ? displayInput(input) : isSymbol(input);
};

//Variable storage
let num1;
let operateSymbol;
let num2;
let answer;

//Calculator screen
let calcScreen = document.querySelector(".screen--text");

//Populate calculator screen with received input if it is a number, then send off to storage variable
const displayInput = (num) => {
  if (!answer) {
    calcScreen.innerText += num;
  } else {
    calcScreen.innerText = "";
    calcScreen.innerText += num;
  }
  let screenNums = calcScreen.innerText;
  // if (num1 && answer) {
  //   num1 = parseFloat(answer);
  // }
  if (!operateSymbol) {
    //fix this, num1 not changing
    console.log("running");
    num1 = parseFloat(screenNums);
  } else {
    num2 = parseFloat(screenNums);
  }

  console.log(`displayInput ${num1} ${operateSymbol} ${num2}`);
};

const isSymbol = (symbol) => {
  switch (symbol) {
    case "+":
    case "-":
    case "*":
    case "×":
    case "/":
    case "÷":
      calcScreen.innerText = "";
      operateSymbol = symbol;
      if (num2) operate(num1, operateSymbol, num2);
      console.log(`isSymbol ${num1} ${operateSymbol} ${num2}, ${answer}`);
      break;
    case "Enter":
    case "=":
      screenNums = calcScreen.innerText;
      if (!num2) num2 = parseFloat(screenNums);
      operate(num1, operateSymbol, num2);
      break;
    case "Backspace":
    case "←":
      screenNums = calcScreen.innerText;
      calcScreen.innerText = screenNums.slice(0, -1);
      break;
    case "C":
    case "c":
      num1 = undefined;
      operateSymbol = undefined;
      num2 = undefined;
      answer = undefined;
      calcScreen.innerText = "";
      break;
    default:
      break;
  }
};

//Operate function that takes operator and 2 numbers and calls one of the basic math functions on them
const operate = (a, operator, b) => {
  switch (operator) {
    case "+":
      answer = a + b;
      break;
    case "-":
      answer = a - b;
      break;
    case "*":
    case "×":
      answer = a * b;
      break;
    case "/":
    case "÷":
      a == "0" || b == "0" ? (answer = ">:(") : (answer = a / b);
      break;
    default:
      break;
  }
  calcScreen.innerText = answer;
};

//Run initial functions on load
window.addEventListener("load", () => {
  //Send input to be sorted in another function
  let allBtn = document.querySelector(".interface--buttons");
  allBtn.onclick = (btn) => sortInput(btn.target.innerText);
  document.onkeyup = (btn) => sortInput(btn.key);
});
