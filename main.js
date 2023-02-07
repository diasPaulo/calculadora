function getButtonPressed(_button) {
  let classButton = _button.classList[0];

  switch (classButton) {
    case "number":
    case "point":
      getNumber(_button);
      break;

    case "operator":
      getOperator(_button);
      break;

    case "change-signal":
      changeSignal();
      break;

    case "clean-all":
      cleanDisplay();
      break;

    case "clean":
      removeLastElement();
      break;

    default:
      equals();
      break;
  }
}

function getNumber(_button) {
  let element = _button.innerText === "," ? "." : _button.innerText;

  if (operatorDisplay.innerText === "=") {
    operatorDisplay.innerText = "";
    cleanExpression();
    calc = "0";
  }
  
  if (element === ".") {
    calc += element;
  } else {
    calc === "0" ? (calc = element) : (calc += element);
  }

  calcDisplay.innerText = calc.replace(/\./g, ",");
}

function getOperator(_button) {
  if (operatorDisplay.innerText === "=") {
    operatorDisplay.innerText = "";
    cleanExpression();
  }

  if (_button.value === "%") {
    expression += calc * 0.01;
  } else {
    expression += calc + _button.value;
  }

  expressionDisplay.innerText = expression.replace(/\./g, ",");
  cleanCalcDisplay();
}

function equals() {
  operatorDisplay.innerText = "=";

  expression += calc;
  expressionDisplay.innerText = expression.replace(/\./g, ",");

  if (validateExpression(expression)) {
    calc = eval(expression) + "";
    calcDisplay.innerText = calc.replace(/\./g, ",");
  } else {
    alert("Algo deu errado!\nRecarregue a página.");
  }
}

function changeSignal() {
  calc *= -1;
  calcDisplay.innerText = calc.toLocaleString();

  if (operatorDisplay.innerText === "=") {
    cleanExpression();
    operatorDisplay.innerText = "";
  }
}

function validateExpression(expression) {
  const regex = /^[0-9+-\/*\.]+$/;
  return regex.test(expression);
}

function cleanExpression() {
  expression = "";
  expressionDisplay.innerText = expression;
}

function cleanCalcDisplay() {
  calc = "0";
  operatorDisplay.innerText = "";
  calcDisplay.innerText = calc;
}

function removeLastElement() {
  if (operatorDisplay === "=") {
    cleanCalcDisplay();
  } else {
    calc = calc.length == 1 ? "0" : calc.substring(0, calc.length - 1);
    calcDisplay.innerText = calc.replace(/\./g, ",");
  }
}

function cleanDisplay() {
  cleanExpression();
  cleanCalcDisplay();
}

var calc = "0";
var expression = "";
const expressionDisplay = document.getElementById("expression");
const calcDisplay = document.getElementById("calc-display");
const operatorDisplay = document.getElementById("operation");

const buttons = Array.from(document.getElementsByTagName("button"));

buttons.map((_button) =>
  _button.addEventListener("click", () => getButtonPressed(_button))
);

calcDisplay.innerText = calc;
