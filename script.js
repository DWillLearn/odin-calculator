//Basic math functions
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (a == "0" || b == "0" ? ">:(" : a / b);

//Variables for each part of calc operation
let num1;
let operateSymbol;
let num2;
let answer;

//Operate function that takes operator and 2 numbers and calls one of the basic math functions on them
const operate = (firstNum, operator, secondNum) => {
  switch (operator) {
    case "+":
      answer = add(firstNum, secondNum);
      break;
    case "-":
      answer = subtract(firstNum, secondNum);
      break;
    case "*":
    case "×":
      answer = multiply(firstNum, secondNum);
      break;
    case "/":
    case "÷":
      answer = divide(firstNum, secondNum);
      break;
    default:
      break;
  }
};

//Variable that stores display value
let displayNum = "";
let showOnScreen;

//The display itself
let calcScreen = document.querySelector(".screen--text");

//All the calculator buttons
let calcButtons = document.querySelector(".interface--buttons");
let allBtn = calcButtons.querySelectorAll(".row--button");

//Functions that populate calculator display based on keyboard input or mouse input
document.addEventListener("keyup", (e) => {
  allBtn.forEach((btn) => {
    if (e.key == btn.innerText.toLowerCase()) btn.click();
  });
  switch (e.key) {
    case "/":
    case "*":
    case "Enter":
      displayCalc(e.key);
      break;
    case "Backspace":
      displayCalc("←");
      break;
    default:
      break;
  }
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => displayCalc(e.target.innerText));
});

const displayCalc = (button) => {
  let input = button;
  isNaN(input) ? (showOnScreen = false) : (showOnScreen = true);
  showOnScreen ? isNum(input) : isSymbol(input);
  calcScreen.innerText = displayNum;
};

const isNum = (num) => {
  num === displayNum ? (displayNum = num) : (displayNum += num);
  !operateSymbol ? (num1 = parseInt(displayNum)) : (num2 = parseInt(displayNum));
};

const isSymbol = (symbol) => {
  if (symbol != "←") displayNum = "";
  if (symbol != "=" && symbol != "C" && symbol != "←" && !operateSymbol) operateSymbol = symbol;
  switch (symbol) {
    case "C":
      clear();
      break;
    case "←":
      if (displayNum === answer) return;
      displayNum = displayNum.slice(0, -1);
      isNum(displayNum);

      break;
    case "Enter":
    case "=":
      operate(num1, operateSymbol, num2);
      displayNum = answer;
      break;
  }
};

const clear = () => {
  num1 = undefined;
  operateSymbol = undefined;
  num2 = undefined;
};

//Fix later: Add ability to string together operations
//Add decimals, but not more than 1
