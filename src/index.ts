#!/usr/bin/env node
import { calculator } from "./calculator.js";

function runApp(): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(true);
  });
}

let appPromise: Promise<boolean> = runApp();
appPromise
  .then((): void => {
    calculator();
  })
  .catch((): void => {
    console.log("\nThere is some Internal Error.\nPlease Try Again Later");
    setTimeout((): void => {
      console.clear();
    }, 1000);
  });
