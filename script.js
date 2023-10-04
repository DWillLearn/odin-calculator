//Send keyboard or mouse input to calculator
const keyInput = (arr) => {
  document.addEventListener("keyup", (e) => {
    arr.forEach((btn) => {
      let input = btn.innerText;
      e.key === btn.innerText && !isNaN(input) ? displayInput(input) : isSymbol(input);
    });
  });
};

const mouseInput = (arr) => {
  arr.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let input = btn.innerText;
      !isNaN(input) ? displayInput(input) : isSymbol(input);
    });
  });
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
  console.log(num1, operateSymbol, num2);
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
      if (!operateSymbol) operateSymbol = symbol;
      screenNums = calcScreen.innerText;
      if (!num1) num1 = screenNums;
      calcScreen.innerText = "";
      break;
    case "Enter":
    case "=":
      screenNums = calcScreen.innerText;
      if (!num2) num2 = screenNums;
      operate(num1, operateSymbol, num2);
      break;
    // case "Backspace":
    // case "←":
    //     break;
    // case "C":
    //   break;
    //   default:
    //     break;
  }
  console.log(num1, operateSymbol, num2);
};

const clear2 = () => {
  num1 = undefined;
  operateSymbol = undefined;
  num2 = undefined;
};

//Fix later: Add ability to string together operations
//Add decimals, but not more than 1

//Run initial functions on load
window.addEventListener("load", () => {
  let allBtn = document.querySelectorAll(".row--button");
  keyInput(allBtn);
  mouseInput(allBtn);
});

//Basic math functions
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (a == "0" || b == "0" ? ">:(" : a / b);

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
