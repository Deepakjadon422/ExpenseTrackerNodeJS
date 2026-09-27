import {addExpense} from "../services/expenseService.js";
export async function runAdd(o){const e=await addExpense(o.description,o.amount); console.log(`Expense added successfully (ID: ${e.id})`);}