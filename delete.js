import {deleteExpense} from "../services/expenseService.js";
export async function runDelete(o){await deleteExpense(o.id); console.log("Expense deleted successfully");}