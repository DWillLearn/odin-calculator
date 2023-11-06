//Calculator screen
let calcScreen = document.querySelector(".screen--text");

//Calc buttons
let allBtn = document.querySelectorAll(".row--button");

//Store all equation parts
let num1;
let operateSymbol;
let num2;
let answer;

//Send numbers and symbols to proper functions
const sortInput = (input) => {
  !isNaN(input) || (input == "." && !calcScreen.innerText.includes(".")) ? showInput(input) : isSymbol(input);
};

//Populate screen with numbers and decimals
const showInput = (input) => {
  if (!answer) {
    calcScreen.innerText += input;
  } else {
    calcScreen.innerText = "";
    answer = undefined;
    calcScreen.innerText += input;
  }
};

//Sort symbols
const isSymbol = (symbol) => {
  switch (symbol) {
    case "C":
    case "c":
      reset();
      answer = undefined;
      break;
    case "←":
    case "Backspace":
      calcScreen.innerText = calcScreen.innerText.slice(0, -1);
      break;
    case "=":
    case "Enter":
      if (operateSymbol && num2) {
        operate(parseFloat(num1), operateSymbol, parseFloat(num2));
      }
      break;
    default:
      isOperator(symbol);
      break;
  }
};

//Assign numbers to variables
let inputObserver = new MutationObserver((screen) => {
  screen.forEach((mutation) => {
    if (mutation.addedNodes[0] && answer != ">:(") {
      num1 && operateSymbol ? (num2 = mutation.target.innerText) : (num1 = mutation.target.innerText);
    }
  });
});

inputObserver.observe(calcScreen, { childList: true, characterData: true });

//Assign operators to variable
const isOperator = (operator) => {
  if (num1 && !operateSymbol) {
    operateSymbol = operator;
    calcScreen.innerText = "";
  } else if (operateSymbol && num2) {
    operate(parseFloat(num1), operateSymbol, parseFloat(num2));
    operateSymbol = operator;
  }
};

//Perform equations
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
      if (a == "0" || b == "0") {
        answer = ">:(";
      } else {
        answer = a / b;
      }
      break;
    default:
      break;
  }
  answer = answer.toFixed(2);
  calcScreen.innerText = answer;
  nextProb();
};

const nextProb = () => {
  num1 = undefined;
  operateSymbol = undefined;
  num2 = undefined;
};

//Reset all data
const reset = () => {
  num1 = undefined;
  operateSymbol = undefined;
  num2 = undefined;
  answer = undefined;
  calcScreen.innerText = "";
};

//Handle mouse or key event
allBtn.forEach((btn) => (btn.onclick = (calc) => sortInput(calc.target.innerText)));
document.onkeyup = (btn) => {
  allBtn.forEach((calc) => {
    switch (btn.key) {
      case calc.innerText:
      case "Enter":
      case "Backspace":
      case "c":
      case "C":
      case "*":
      case "/":
      case "-":
        btn.preventDefault();
        sortInput(btn.key);
        break;
    }
  });
};
