//Calculator screen
let calcScreen = document.querySelector(".screen--text");

//Calc buttons
let allBtn = document.querySelector(".interface--buttons");

//Store all equation parts
let num1;
let operateSymbol;
let num2;
let answer;

//Send numbers and decimals to screen
const sortInput = (input) => {
  !isNaN(input) || (input == "." && !calcScreen.innerText.includes(".")) ? showInput(input) : isSymbol(input);
  console.log(num1, operateSymbol, num2);
};

//Populate screen with what was clicked
const showInput = (input) => {
  if (!answer) {
    calcScreen.innerText += input;
  } else {
    num1 = undefined;
    num2 = undefined;
    calcScreen.innerText = "";
    assignNum(answer);
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
      assignNum(calcScreen.innerText);
      operate(parseFloat(num1), operateSymbol, parseFloat(num2));
      break;
    default:
      isOperator(symbol);
      break;
  }
};

//Sort operators
const isOperator = (operator) => {
  if (!num1 && !operateSymbol) {
    operateSymbol = operator;
    assignNum(calcScreen.innerText);
    calcScreen.innerText = "";
  } else if (num1 && calcScreen.innerText != "") {
    assignNum(calcScreen.innerText);
    operate(parseFloat(num1), operateSymbol, parseFloat(num2));
    operateSymbol = operator;
  }
};

//Assign numbers to variables
//Consider making this a mutation observer to block operator from running twice
const assignNum = (num) => {
  !num1 ? (num1 = num) : (num2 = num);
  console.log("running");
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
  num1 = ans;
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
allBtn.onclick = (btn) => sortInput(btn.target.innerText);
document.onkeyup = (btn) => sortInput(btn.key);
