let add = (a, b) => {
  firstNumber = (a + b).toString().split("");
  updateScreen(firstNumber.join(""));
};

let subtrack = (a, b) => {
  firstNumber = (a - b).toString().split("");
  updateScreen(firstNumber.join(""));
};

let multiply = (a, b) => {
  firstNumber = (a * b).toString().split("");
  updateScreen(firstNumber.join(""));
};

let divide = (a, b) => {
  if (b === 0) {
    updateScreen(":)", 10); 
    return;
  }
  firstNumber = (a / b).toString().split("");
  updateScreen(firstNumber.join(""));
};

let numbers = document.querySelectorAll(".number");
let operator = document.querySelectorAll(".operator");
let calculate = document.querySelector(".calculate");
let screen = document.querySelector("#screen");
let clear = document.querySelector("#clear");
let point = document.querySelector("#point");
let negpos = document.querySelector("#negpos");
let percentage = document.querySelector("#percentage");

let operatorVal = null;
let isFirstRound = true;
let minus = false;

let firstNumber = [];
let secondNumber = [];

numbers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.target.value;

    if (isFirstRound) {
      if (firstNumber.length === 1 && firstNumber[0] === "0") {
        firstNumber = [];
      }
      firstNumber.push(value);
      updateScreen(firstNumber.join(""));

    } else {
      if (secondNumber.length === 1 && secondNumber[0] === "0") {
        secondNumber = [];
      }
      secondNumber.push(value);
      updateScreen(secondNumber.join(""));
     
    }
  });
});

operator.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (secondNumber.length > 0) {
      calculation();
    }

    operatorVal = e.target.value;
    isFirstRound = false;
    console.log("operator: " + operatorVal);
  });
});

let calculation = () => {
  if (isFirstRound === true || secondNumber.length === 0) {
    console.log("second number is not provided");
    return;
  }

  let num1 = Number(firstNumber.join(""));
  let num2 = Number(secondNumber.join(""));

  switch (operatorVal) {
    case "add":
      add(num1, num2);
      break;
    case "subtract":
      subtrack(num1, num2);
      break;
    case "multiply":
      multiply(num1, num2);
      break;
    case "divide":
      divide(num1, num2);
      break;
  }

  secondNumber = [];
  isFirstRound = true; 
  operatorVal = null;
};

calculate.addEventListener("click", calculation);

point.addEventListener("click", () => {
  if (isFirstRound && firstNumber.includes(".")) return;
  if (!isFirstRound && secondNumber.includes(".")) return;

  if (isFirstRound) {
    firstNumber.push(".");
    updateScreen(firstNumber.join(""));
  } else {
    secondNumber.push(".");
    updateScreen(secondNumber.join(""));
  }
});

negpos.addEventListener("click", () => {
  if (isFirstRound) {
    if (firstNumber[0] === "-") {
      firstNumber.shift();
    } else {
      firstNumber.unshift("-");
    }

    updateScreen(firstNumber.join(""));
  } else {
    if (secondNumber[0] === "-") {
      secondNumber.shift();
    } else {
      secondNumber.unshift("-");
    }

    updateScreen(secondNumber.join(""));
  }
});

percentage.addEventListener("click", () => {
  let targetArray = isFirstRound ? firstNumber : secondNumber;

  if (targetArray.length > 0) {
    let numb = Number(targetArray.join(""));
    let result = (numb / 100).toString().split("");
    updateScreen(result.join(""));

    if (isFirstRound) {
      firstNumber = result;
    } else {
      secondNumber = result;
    }
  }
});

clear.addEventListener("click", () => {
  firstNumber = [];
  secondNumber = [];
  updateScreen("0");
  operatorVal = null;
  isFirstRound = true;
});

const updateScreen = (text, maxLength = 8) => {
    const screenElement = document.querySelector("#screen");
  
    if (text.length > maxLength) {
      text = text.slice(0, maxLength); 
    }
  
    screenElement.textContent = text; 
  };

  document.addEventListener("keydown", (e) => {
    const key = e.key;
  

    if (!isNaN(key) && key.trim() !== "") {
      if (isFirstRound) {
        firstNumber.push(key);
        updateScreen(firstNumber.join(""));
      } else {
        secondNumber.push(key);
        updateScreen(secondNumber.join(""));
      }
    }
  

    if (key === "Backspace") {
      if (isFirstRound && firstNumber.length > 0) {
        firstNumber.pop(); // Son elemanı sil
        updateScreen(firstNumber.join(""));
      } else if (!isFirstRound && secondNumber.length > 0) {
        secondNumber.pop(); // Son elemanı sil
        updateScreen(secondNumber.join(""));
      }
    }
  
    // Diğer tuşları engelle
    if (!(!isNaN(key) || key === "Backspace")) {
      e.preventDefault(); // Geçersiz tuşu engelle
    }
  });
  