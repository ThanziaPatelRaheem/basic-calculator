"use strict";
const inputDisplay = document.querySelector(".display");

const numberEl = document.querySelectorAll(".num");
const operatorEl = document.querySelectorAll(".button");
const delLastDigit = document.querySelector(".num--DEL");
console.log(operatorEl);

//Declare Variables

let firstNum = "";
let currentNum = "";
let lastOperation = "";
let result = "";
let hasDecimal = false;

//Function to display the result

function updateDisplay(value) {
  inputDisplay.textContent = value;
}

// Function to clear the input

function clearInput() {
  firstNum = "";
  currentNum = "";
  lastOperation = "";
  result = "";
  inputDisplay.textContent = 0;
  hasDecimal = false;
}
// Looping over each number and adding Eventlistener

numberEl.forEach((num) => {
  num.addEventListener("click", () => {
    const inputVal = num.textContent;

    if (inputVal === "C") {
      clearInput();
      return;
    }

    if (inputVal === "." && !hasDecimal) {
      hasDecimal = true;
    } else if (inputVal === "." && hasDecimal) {
      return;
    }

    currentNum += inputVal;
    console.log(`CurrentNum: ${currentNum}`);
    updateDisplay(currentNum);
  });
});

// updating display for operation

function updateOperation(name = "") {
  if (firstNum && currentNum && lastOperation) {
    performOperations();
  }

  firstNum += `${currentNum} ${name} `;
  currentNum = "";
  lastOperation = name;
  updateDisplay(firstNum);
}
// Function to perform arithmetic operations
function performOperations() {
  if (result === "") {
    result = parseFloat(firstNum);
  }

  if (!currentNum) return;
  hasDecimal = false;

  switch (lastOperation) {
    case "+":
      result = parseFloat(result) + parseFloat(currentNum);
      break;
    case "-":
      result = parseFloat(result) - parseFloat(currentNum);
      break;
    case "*":
      result = parseFloat(result) * parseFloat(currentNum);
      break;
    case "%":
      result = parseFloat(result) % parseFloat(currentNum);
      break;
    case "/":
      if (parseFloat(currentNum) === 0) {
        result = "Error";
      } else {
        result = parseFloat(result) / parseFloat(currentNum);
      }
      break;
    default:
      result = parseFloat(currentNum);
  }
  updateDisplay(result);
  firstNum = "";
  currentNum = result;
  lastOperation = "";
}

// Looping throught the operators and attaching EventListener

operatorEl.forEach((operator) => {
  operator.addEventListener("click", () => {
    const operation = operator.textContent;
    console.log(`operation clicked:${operation}`);

    if (!currentNum && !firstNum && operation !== "=") return;
    hasDecimal = false;

    if (operation === "=") {
      if (firstNum && currentNum && lastOperation) {
        performOperations();
      } else {
        result = parseFloat(currentNum);
        updateDisplay(result);
      }
    } else {
      updateOperation(operation);
    }
  });
});
