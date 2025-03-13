import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
// 7-character random string
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer,
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

/* 
  Common Special Interpolations:
  %s - String substitution
  %d or %i - Integer substitution
  %f - Floating-point number substitution
  %o - Object substitution
  %O - More detailed object representation
  %c - CSS styling for custom console output
 */

const pprintStyles = ["color: #ff6b6b", "background: #eafaff", "font-weight: bold"].join(";");

export const pprint = (value: unknown, label: string = ""): void => {
  // Use CSS styling and special formatting for better console output

  // Log with styling and different console methods
  if (typeof value === "object") {
    console.log("%c%s %o", pprintStyles, `${label}:`, value);
  } else {
    const formattedValue = String(value);
    console.log("%c%s %c%s", pprintStyles, `${label}:`, "color: #4dabf7", formattedValue);
  }
  // Add separator for better readability
  // console.log("%c----------------------", "color: #868e96");
};

/**
 * Prints multiple value-label pairs on the same line
 * @param pairs - Array of objects with value and label properties
 * @example
 * pprintMultiple([
 *   { value: "hello", label: "Greeting" },
 *   { value: 42, label: "Answer" },
 *   { value: { foo: "bar" }, label: "Object" }
 * ]);
 */
export const pprintMultiple = (pairs: Array<[string, unknown]>): void => {
  let formatString = "";
  const formatValues: unknown[] = [];

  pairs.forEach((pair, index) => {
    const [label, value] = pair;
    // Add label styling
    formatString += "%c" + label + ": ";
    formatValues.push(pprintStyles);

    // Add value with appropriate formatting
    if (typeof value === "object") {
      formatString += "%o";
    } else {
      formatString += "%c%s";
      formatValues.push("color: #4dabf7");
    }

    formatValues.push(value);

    // Add separator between pairs (except for the last one)
    if (index < pairs.length - 1) {
      formatString += " | ";
    }
  });

  console.log(formatString, ...formatValues);
};

export function pprintObject(value: unknown, label: string): void {
  console.log("%c%s", pprintStyles, `${label}:`);
  console.log("%c" + JSON.stringify(value, null, 2), "color: green; font-weight: bold;");
}

export function pprintTable(value: unknown, label: string): void {
  console.log("%c%s", pprintStyles, `${label}:`);
  console.table(value);
}

function runPprintExamples(): void {
  const name = "Alice";
  const age = 25;
  const obj = { key: "value" };

  // %s - String
  console.log("Hello, %s!", name); // Output: Hello, Alice!

  // %d or %i - Integer
  console.log("Age: %d", age); // Output: Age: 25

  // %f - Floating point
  console.log("Pi is approximately: %f", 3.14159); // Output: Pi is approximately: 3.141590

  // %o - Object
  console.log("Object: %o", obj); // Output: Object: { key: "value" }

  // %O - Detailed Object
  console.log("Detailed Object: %O", obj);

  // %c - Custom CSS Styling
  console.log("%cStyled Text!", "color: blue; font-size: 20px; font-weight: bold;");
}

export const getElementType = (str: string) => str.match(/(.*?)-?(block|layout)-?(.*)?/);
