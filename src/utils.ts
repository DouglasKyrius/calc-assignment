import { data } from "./appData.js";

type TClearOperation = {
  error?: boolean;
};

function clearOperation({ error }: TClearOperation) {
  data.reset();
  console.clear();
  if (error) console.log("An error ocurred, please try again.");
  console.log(data.getResult());
}

function startUp() {
  console.log(
    'CLI Calculator - Type an expression or "c" to clear and "q" to quit.\n\n' +
      data.getResult()
  );
}

function quitApp() {
  console.log("\nClosing CLI Calculator, please wait.");
  setTimeout((): void => {
    console.clear();
  }, 1500);
}

export { clearOperation, quitApp, startUp };
