import readlineSync from "readline-sync";
import { evaluate } from "./evaluate.js";

async function calculator() {
  let iter = true;
  let expression = "";
  let result = 0;

  console.log(
    'CLI Calculator - Type an expression or "c" to clear and "q" to quit.\n\n',
    result
  );

  function clearOperation(invalidExpression = false) {
    expression = "";
    result = 0;
    console.clear();
    if (invalidExpression) console.log("Invalid expression. Please try again.");
    console.log(result);
  }

  while (iter) {
    const userInput = readlineSync.question("> ");

    if (userInput.includes("q")) {
      iter = false;
      console.log("\nClosing CLI Calculator, please wait.");
      setTimeout((): void => {
        console.clear();
      }, 1500);
      break;
    }

    if (userInput === "c") {
      clearOperation();
    } else if (userInput.includes("=")) {
      expression += userInput.replace("=", "");

      if (result !== null) {
        result = evaluate(expression, true);
        console.log(result);
        if (isNaN(result)) {
          clearOperation(true);
        }
        expression = result.toString();
        result = 0;
      } else {
        clearOperation(true);
      }
    } else {
      expression += userInput;
      result = evaluate(expression);
    }
  }
}

export { calculator };
