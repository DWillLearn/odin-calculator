//Fix later: Add ability to string together operations

const sortInput = (input) => {
  !isNaN(input) || (input == "." && !calcScreen.innerText.includes(".")) ? displayInput(input) : isSymbol(input);
  console.log(num1, operateSymbol, num2);
};

//Variable storage
let num1;
let operateSymbol;
let num2;

//Calculator screen
let calcScreen = document.querySelector(".screen--text");

//Populate calculator screen with received input if it is a number, then send off to storage variable
const displayInput = (num) => {
  calcScreen.innerText += num;
};

const isSymbol = (symbol) => {
  let screenNums;
  switch (symbol) {
    case "+":
    case "-":
    case "*":
    case "×":
    case "/":
    case "÷":
      if (!operateSymbol) {
        screenNums = calcScreen.innerText;
        num1 = parseFloat(screenNums);
        operateSymbol = symbol;
        calcScreen.innerText = "";
      } else if (operateSymbol && !isNaN(calcScreen.innerText)) {
        screenNums = calcScreen.innerText;
        num2 = parseFloat(screenNums);
        operate(num1, operateSymbol, num2);
      }
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
      calcScreen.innerText = "";
      break;
    default:
      break;
  }
};

//Operate function that takes operator and 2 numbers and calls one of the basic math functions on them
const operate = (a, operator, b) => {
  let answer;
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
