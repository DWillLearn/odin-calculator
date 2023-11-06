//Calculator screen
let calcScreen = document.querySelector(".screen--text");

//Calc buttons
let allBtn = document.querySelector(".interface--buttons");

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
  calcScreen.innerText += input;
  // } else {
  //   num1 = undefined;
  //   num2 = undefined;
  //   calcScreen.innerText = "";
  //   answer = undefined;
  //   calcScreen.innerText += input;
  // }
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
      operate(parseFloat(num1), operateSymbol, parseFloat(num2));
      break;
    default:
      isOperator(symbol);
      break;
  }
};
//Assign numbers to variables
//Consider making this a mutation observer to block operator from running twice
let inputObserver = new MutationObserver((screen) => {
  screen.forEach((mutation) => {
    if (mutation.addedNodes[0]) {
      num1 && operateSymbol ? (num2 = mutation.target.innerText) : (num1 = mutation.target.innerText);
    }
    console.log(mutation.target.innerText, num1, operateSymbol, num2);
  });
});

inputObserver.observe(calcScreen, { childList: true, characterData: true });

//Assign operators to variable
const isOperator = (operator) => {
  if (!operateSymbol) {
    operateSymbol = operator;
    calcScreen.innerText = "";
  } else {
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
      a == "0" || b == "0" ? (answer = ">:(") : (answer = a / b);
      break;
    default:
      break;
  }
  calcScreen.innerText = answer;
  nextProb(answer);
};

const nextProb = (ans) => {
  num1 = undefined;
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
allBtn.onclick = (btn) => sortInput(btn.target.innerText);
document.onkeyup = (btn) => sortInput(btn.key);
