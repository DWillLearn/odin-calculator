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

// Type in the first number
//When operator is put in, store first number in num1
//Also store operator in operateSymbol
//Type in second number
//When equals is put in, store second number in num2
//Also run operate(num1, operateSymbol, num2)
