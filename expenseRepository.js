import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.resolve(__dirname, "../../data/expenses.json");

export async function loadExpenses() {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    if (!Array.isArray(data)) throw new Error("Data file must contain an array.");
    return data;
  } catch (e) {
    if (e.code === "ENOENT") return [];
    if (e instanceof SyntaxError) throw new Error("Expense data file contains invalid JSON.");
    throw e;
  }
}
export async function saveExpenses(expenses) {
  await fs.mkdir(path.dirname(DATA_FILE), {recursive:true});
  const tmp = DATA_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(expenses, null, 2) + "\n", "utf8");
  await fs.rename(tmp, DATA_FILE);
}