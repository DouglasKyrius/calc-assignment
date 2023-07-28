function isOperator(char: string): boolean {
  return ["+", "-", "*", "/"].includes(char);
}

function isDigit(char: string): boolean {
  return /^\d$/.test(char);
}

function evaluate(expression: string, includesEquals = false): number {
  let currentToken = "";
  const tokens: (string | number)[] = [];

  for (const char of expression) {
    if (isOperator(char)) {
      if (currentToken !== "") {
        tokens.push(parseFloat(currentToken));
      }
      tokens.push(char);
      currentToken = "";
    } else if (isDigit(char) || char === ".") {
      currentToken += char;
    } else {
      throw new Error("Invalid character in the expression.");
    }
  }

  if (currentToken !== "") {
    tokens.push(parseFloat(currentToken));
  }

  let result = tokens[0] as number;

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i] as string;
    const operand = tokens[i + 1] as number;

    if (isNaN(operand)) {
      throw new Error("Invalid expression.");
    }

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        result /= operand;
        break;
      default:
        throw new Error("Invalid operator.");
    }
  }

  if (!includesEquals) console.log(tokens[tokens.length - 1]);
  return result;
}

export { evaluate };
