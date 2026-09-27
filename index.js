#!/usr/bin/env node
import {runAdd} from "./commands/add.js";
import {runUpdate} from "./commands/update.js";
import {runDelete} from "./commands/delete.js";
import {runList} from "./commands/list.js";
import {runSummary} from "./commands/summary.js";

function usage(){console.log(`\nExpense Tracker\n\nUsage:\n  expense-tracker add --description "Lunch" --amount 20\n  expense-tracker update --id 1 [--description "Dinner"] [--amount 25]\n  expense-tracker delete --id 1\n  expense-tracker list\n  expense-tracker summary [--month 9]\n`);}
function parse(a){const o={}; for(let i=0;i<a.length;i++){if(!a[i].startsWith("--")) throw new Error(`Unexpected argument: ${a[i]}`); const k=a[i].slice(2),v=a[++i]; if(v===undefined||v.startsWith("--")) throw new Error(`Missing value for --${k}`); o[k]=v;} return o;}
const [cmd,...args]=process.argv.slice(2);
try {
 if(!cmd){usage();process.exitCode=1;} else if(["help","--help","-h"].includes(cmd)){usage();}
 else {const o=parse(args); switch(cmd){
  case "add": if(!o.description||o.amount===undefined) throw new Error("add requires --description and --amount."); await runAdd(o); break;
  case "update": if(o.id===undefined) throw new Error("update requires --id."); await runUpdate(o); break;
  case "delete": if(o.id===undefined) throw new Error("delete requires --id."); await runDelete(o); break;
  case "list": await runList(); break;
  case "summary": await runSummary(o); break;
  default: throw new Error(`Unknown command: ${cmd}`);
 }}
} catch(e){console.error(`Error: ${e.message}`);process.exitCode=1;}