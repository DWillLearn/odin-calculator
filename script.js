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

//Function thats populates calculator display
const calcDisplay = () => {
  let calcText = document.querySelector(".screen--text");
  let calcButtons = document.querySelectorAll(".row--button");

  calcButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      displayNum += e.target.innerText;
      switch (isNaN(parseInt(btn.innerText))) {
        case true:
          calcText.innerText = "";
          break;
        case false:
          calcText.innerText = displayNum;
          break;
      }
    });
  });
};

calcDisplay();
