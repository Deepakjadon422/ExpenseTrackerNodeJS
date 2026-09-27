import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {execFile} from "node:child_process";
import {promisify} from "node:util";
const exec=promisify(execFile);
const cli=new URL("../src/index.js",import.meta.url).pathname;
const data=new URL("../data/expenses.json",import.meta.url).pathname;
async function run(...a){return exec(process.execPath,[cli,...a]);}
test.beforeEach(async()=>{await fs.writeFile(data,"[]\n");});
test("CRUD and summary",async()=>{
 let r=await run("add","--description","Lunch","--amount","20"); assert.match(r.stdout,/ID: 1/);
 r=await run("add","--description","Dinner","--amount","10"); assert.match(r.stdout,/ID: 2/);
 r=await run("summary"); assert.equal(r.stdout.trim(),"Total expenses: $30.00");
 await run("update","--id","1","--amount","25");
 await run("delete","--id","2");
 r=await run("summary"); assert.equal(r.stdout.trim(),"Total expenses: $25.00");
});