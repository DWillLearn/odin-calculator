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
const screenChange = (screen) => {
  if(screen.innerText != ""){
    console.log(screen.innerText);

  }
};
let inputObserver = new MutationObserver(screenChange);
inputObserver.observe(calcScreen, { characterData: true, childList: true });

const displayInput = (num) => {
  if (!answer) {
    calcScreen.innerText += num;
  } else {
    // nextProb(answer, operateSymbol);
    calcScreen.innerText = "";
    calcScreen.innerText += num;
  }
};

const isSymbol = (symbol) => {
  switch (symbol) {
    case "C":
    case "c":
      clear();
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

const assignNum = (num) => {
  num1 ? (num2 = num) : (num1 = num);
};

const isOperator = (symbol) => {
  if (!operateSymbol) {
    operateSymbol = symbol;
    assignNum(calcScreen.innerText);
    calcScreen.innerText = "";
  } else {
    assignNum(calcScreen.innerText);
    operate(parseFloat(num1), operateSymbol, parseFloat(num2));
    nextProb(answer, symbol);
    // operateSymbol = symbol;
  }
};

const nextProb = (ans, sym) => {
  clear();
  assignNum(ans);
  calcScreen.innerText = num1;
  operateSymbol = sym;
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

//Clear all progress
const clear = () => {
  num1 = undefined;
  operateSymbol = undefined;
  num2 = undefined;
  answer = undefined;
  calcScreen.innerText = "";
  console.log("cleared");
};

//Run initial functions on load
window.addEventListener("load", () => {
  //Send input to be sorted in another function
  let allBtn = document.querySelector(".interface--buttons");
  allBtn.onclick = (btn) => sortInput(btn.target.innerText);
  document.onkeyup = (btn) => sortInput(btn.key);
});