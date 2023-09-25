//Basic math functions
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (a == "0" || b == "0" ? ">:(" : a / b);

//Variables for each part of calc operation
let num1;
let operateSymbol;
let num2;

//Operate function that takes operator and 2 numbers and calls one of the basic math functions on them
const operate = (firstNum, operator, secondNum) => {
  switch (operator) {
    case "+":
      displayNum = add(firstNum, secondNum);
      break;
    case "-":
      displayNum = subtract(firstNum, secondNum);
      break;
    case "*":
      displayNum = multiply(firstNum, secondNum);
      break;
    case "/":
      displayNum = divide(firstNum, secondNum);
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

//Functions that populate calculator display based on keyboard input or mouse input
document.addEventListener("keyup", (e) => {
  let allBtn = calcButtons.querySelectorAll(".row--button");
  allBtn.forEach((btn) => {
    if (e.key == btn.innerText) btn.click();
  });
});

calcButtons.addEventListener("click", (e) => displayCalc(e));

const displayCalc = (e) => {
  let input = e.target.innerText;
  isNaN(input) ? (showOnScreen = false) : (showOnScreen = true);
  showOnScreen ? isNum(input) : isSymbol(input);
  calcScreen.innerText = displayNum;
};

const isNum = (num) => {
  displayNum += num;
  !operateSymbol ? (num1 = parseInt(displayNum)) : (num2 = parseInt(displayNum));
};

const isSymbol = (symbol) => {
  displayNum = "";
  if (symbol != "=" && symbol != "C" && !operateSymbol) operateSymbol = symbol;
  switch (symbol) {
    case "C":
      num1 = undefined;
      operateSymbol = undefined;
      num2 = undefined;
      break;
    case "=":
      operate(num1, operateSymbol, num2);
      break;
  }
};

//Fix later: Add ability to string together operations
//Add decimals, but not more than 1
//Add backspace
