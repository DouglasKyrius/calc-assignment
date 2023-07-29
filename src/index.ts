#!/usr/bin/env node
import { calculator } from "./calculator.js";
import { startUp } from "./utils.js";

function bootstrap(): void {
  calculator();
}

try {
  startUp();
  bootstrap();
} catch (error) {
  console.log("\nThere is some Internal Error.\nPlease Try Again Later");
  setTimeout((): void => {
    console.clear();
  }, 2000);
}
