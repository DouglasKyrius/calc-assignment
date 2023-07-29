interface Data {
  getResult(): number;
  setResult(value: number): void;

  getExpression(): string;
  setExpression(value: string): void;
  addExpression(value: string): void;

  reset(): void;
}

class OperationsData implements Data {
  public result: number;
  public expression: string;

  constructor() {
    this.result = 0;
    this.expression = this.result.toString();
  }

  public getResult(): number {
    return this.result;
  }
  public setResult(value: number) {
    this.result = value;
  }

  public getExpression(): string {
    return this.expression;
  }
  public setExpression(value: string): void {
    this.expression = value;
  }
  public addExpression(value: string): void {
    this.expression += value;
  }

  public reset(): void {
    this.result = 0;
    this.expression = this.result.toString();
  }
}

const data = new OperationsData();

export { data };
