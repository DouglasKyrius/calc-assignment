interface ExprTreeNode {
  evaluate: () => number;
}

class NumberNode implements ExprTreeNode {
  constructor(private value: number) {}

  public evaluate(): number {
    return this.value;
  }
}

class OperatorNode implements ExprTreeNode {
  constructor(
    private readonly operator: string,
    private readonly left: ExprTreeNode,
    private readonly right: ExprTreeNode
  ) {}

  public evaluate(): number {
    const leftValue = this.left.evaluate();
    const rightValue = this.right.evaluate();

    switch (this.operator) {
      case "+":
        return leftValue + rightValue;
      case "-":
        return leftValue - rightValue;
      case "*":
        return leftValue * rightValue;
      case "/":
        return leftValue / rightValue;
      default:
        throw new Error("Unkown operator");
    }
  }
}

function getPrecende(operator: string): number {
  if (operator === "+" || operator === "-") return 1;
  if (operator === "*" || operator === "/") return 2;
  return 0;
}

function parseExpression(input: string): ExprTreeNode | null {
  const tokens = input.match(/\d+|\+|\-|\*|\//g);
  if (!tokens) return null;

  const outputQueue: (ExprTreeNode | string)[] = [];
  const operatorStack: string[] = [];

  for (const token of tokens) {
    if (/\d+/.test(token)) {
      outputQueue.push(new NumberNode(parseFloat(token)));
    } else if (/[\+\-\*\/]/.test(token)) {
      while (
        operatorStack.length > 0 &&
        getPrecende(operatorStack[operatorStack.length - 1]) >=
          getPrecende(token)
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop()!);
  }

  const evaluationStack: ExprTreeNode[] = [];

  for (const token of outputQueue) {
    if (typeof token === "string") {
      const right = evaluationStack.pop();
      const left = evaluationStack.pop();

      if (!left || !right) return null;

      evaluationStack.push(new OperatorNode(token, left, right));
    } else {
      evaluationStack.push(token);
    }
  }

  return evaluationStack.length === 1 ? evaluationStack[0] : null;
}

function evaluate(input: string): number | null {
  const expressionTree = parseExpression(input);

  return expressionTree ? expressionTree.evaluate() : null;
}

export { evaluate };
