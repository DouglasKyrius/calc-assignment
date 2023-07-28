import readlineSync from "readline-sync";
import { evaluate } from "./evaluate.js";
import { data } from "./appData.js";

async function calculator() {
  let iter = true;

  console.log(
    'CLI Calculator - Type an expression or "c" to clear and "q" to quit.\n\n' +
      data.getResult()
  );

  function clearOperation() {
    data.reset();
    console.clear();
    console.log(data.getResult());
  }

  function quitApp() {
    console.log("\nClosing CLI Calculator, please wait.");
    setTimeout((): void => {
      console.clear();
    }, 1500);
  }

  while (iter) {
    const userInput = readlineSync.question("> ");

    if (userInput.includes("q")) {
      iter = false;
      quitApp();
      break;
    }

    if (userInput === "c") {
      clearOperation();
    } else if (userInput.includes("=")) {
      data.addExpression(userInput.replace("=", ""));

      if (data.getResult() !== null) {
        data.setResult(evaluate(data.getExpression(), true));

        console.log(data.getResult());

        data.setExpression(data.getResult().toString());
        data.setResult(0);
      } else {
        clearOperation();
      }
    } else {
      data.addExpression(userInput);
      data.setResult(evaluate(data.getExpression()));
    }
  }
}

export { calculator };
