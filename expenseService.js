import {loadExpenses, saveExpenses} from "../repository/expenseRepository.js";

function amount(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) throw new Error("Amount must be a number greater than 0.");
  if (Math.round(n * 100) !== n * 100) throw new Error("Amount can have at most 2 decimal places.");
  return Math.round(n * 100) / 100;
}
function description(value) {
  if (!value || !value.trim()) throw new Error("Description cannot be empty.");
  return value.trim();
}
export async function addExpense(desc, value) {
  const es = await loadExpenses();
  const e = {id: es.reduce((m,x)=>Math.max(m,x.id),0)+1, date:new Date().toISOString().slice(0,10), description:description(desc), amount:amount(value)};
  es.push(e); await saveExpenses(es); return e;
}
export async function updateExpense(id, desc, value) {
  const es=await loadExpenses(), e=es.find(x=>x.id===Number(id));
  if(!e) throw new Error(`Expense with ID ${id} does not exist.`);
  if(desc===undefined && value===undefined) throw new Error("Provide --description and/or --amount.");
  if(desc!==undefined) e.description=description(desc);
  if(value!==undefined) e.amount=amount(value);
  await saveExpenses(es); return e;
}
export async function deleteExpense(id) {
  const es=await loadExpenses(), i=es.findIndex(x=>x.id===Number(id));
  if(i<0) throw new Error(`Expense with ID ${id} does not exist.`);
  es.splice(i,1); await saveExpenses(es);
}
export async function listExpenses() {
  const es=await loadExpenses(); return es.sort((a,b)=>a.date.localeCompare(b.date)||a.id-b.id);
}
export async function getSummary(month) {
  const es=await loadExpenses();
  if(month===undefined) return es.reduce((s,e)=>s+e.amount,0);
  const m=Number(month);
  if(!Number.isInteger(m)||m<1||m>12) throw new Error("Month must be an integer between 1 and 12.");
  const y=new Date().getFullYear();
  return es.filter(e=>{const d=new Date(e.date+"T00:00:00"); return d.getFullYear()===y&&d.getMonth()+1===m;}).reduce((s,e)=>s+e.amount,0);
}