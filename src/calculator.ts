import readlineSync from "readline-sync";
import { evaluate } from "./evaluateTree.js";
import { data } from "./appData.js";
import { clearOperation, quitApp } from "./utils.js";

function calculator() {
  let iter = true;

  while (iter) {
    const userInput = readlineSync.question("> ");

    if (userInput.includes("q")) {
      iter = false;
      quitApp();
      break;
    }

    if (userInput.includes("c")) {
      clearOperation({});
    } else if (userInput.includes("=")) {
      data.addExpression(userInput.replace("=", ""));

      if (data.getResult() !== null) {
        data.setResult(evaluate(data.getExpression())!);

        console.log(data.getResult());

        data.setExpression(data.getResult().toString());
        data.setResult(0);
      } else {
        clearOperation({ error: true });
      }
    } else {
      const tokens = userInput.match(/\d+|\+|\-|\*|\//g);

      data.addExpression(userInput);
      data.setResult(evaluate(data.getExpression())!);

      if (tokens) {
        const lastToken = tokens[tokens.length - 1];

        if (/\d+/.test(lastToken)) {
          console.log(parseFloat(lastToken));
        } else {
          console.log(lastToken);
        }
      }
    }
  }
}

export { calculator };
