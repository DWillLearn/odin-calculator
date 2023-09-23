//Basic math functions
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};

//Variables for each part of calc operation
let num1;
let operateSymbol;
let num2;

//Operate function that takes operator and 2 numbers and calls one of the basic math functions on them
const operate = (firstNum, operator, secondNum) => {
  switch (operator) {
    case "+":
      add(firstNum, secondNum);
      break;
    case "-":
      subtract(firstNum, secondNum);
      break;
    case "*":
      multiply(firstNum, secondNum);
      break;
    case "/":
      divide(firstNum, secondNum);
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
let calcButtons = document.querySelectorAll(".row--button");

//Function thats populates calculator display
//If a calcButton that has showOnScreen as true is pressed, it becomes calcScreen's inner text
calcButtons.forEach((btn) => {
  //sort calcButtons by number and operator
  btn.addEventListener("click", () => {
    let input = btn.innerText;
    isNaN(input) ? (showOnScreen = false) : (showOnScreen = true);
    showOnScreen ? isNum(input) : isSymbol(output);

    if (!showOnScreen && !num1) {
      num1 = displayNum;
      operateSymbol = input;
      displayNum = "";
    } else {
      displayNum = "";
    }
  });
});

const isNum = (num) => {
  displayNum += num;
  calcScreen.innerText = displayNum;
};

const isSymbol = (symbol) => {
  switch (symbol) {
    case "=":
      num2 = displayNum;
      operate(num1, operateSymbol, num2);
      break;
    default:
  }
};
// Type in the first number
//When operator is put in, store first number in num1
//Also store operator in operateSymbol
//Type in second number
//When equals is put in, store second number in num2
//Also run operate(num1, operateSymbol, num2)
