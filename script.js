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
  calcScreen.innerText += num;
};

const isSymbol = (symbol) => {
  if (symbol == "C" || symbol == "c") {
    clear();
  } else if (symbol == "=") {
    assignNum(calcScreen.innerText);
    operate(parseFloat(num1), operateSymbol, parseFloat(num2))
  } else {
    operateSymbol = symbol;
    assignNum(calcScreen.innerText);
    calcScreen.innerText = "";
  }
};

const assignNum = (num) => {
  num1 ? (num2 = num) : (num1 = num);
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

const clear = () => {
  num1 = undefined;
  operateSymbol = undefined;
  num2 = undefined;
  calcScreen.innerText = "";
};
//Run initial functions on load
window.addEventListener("load", () => {
  //Send input to be sorted in another function
  let allBtn = document.querySelector(".interface--buttons");
  allBtn.onclick = (btn) => sortInput(btn.target.innerText);
  document.onkeyup = (btn) => sortInput(btn.key);
});
