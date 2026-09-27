# Expense Tracker

A simple command-line expense tracker built with **Node.js**.

## Project URL

**GitHub:** https://github.com/Deepakjadon422/ExpenseTrackerNodeJS

**Roadmap.sh:** https://roadmap.sh/projects/expense-trackerNodeJS

## Features

- Add, update, delete and list expenses
- Overall expense summary
- Monthly summary for the current year
- JSON persistence
- Input validation and error handling
- Automated tests with Node.js built-in test runner

## Tech Stack

- Node.js 18+
- JavaScript ES Modules
- Node.js File System APIs
- JSON
- Node.js built-in test runner

## Run

```bash
git clone https://github.com/Deepakjadon422/ExpenseTracker.git
cd ExpenseTracker
node src/index.js add --description "Lunch" --amount 20
node src/index.js add --description "Dinner" --amount 10
node src/index.js list
node src/index.js summary
node src/index.js update --id 1 --amount 25
node src/index.js delete --id 2
node src/index.js summary --month 9
```

## Tests

```bash
npm test
```

No external npm dependencies are required.
