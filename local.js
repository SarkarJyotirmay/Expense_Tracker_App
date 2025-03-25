
import { showExpenses } from "./script.js";

// INCOME RELATED
const incomeInput = document.querySelector("#income-form > input");
const budgetSpan = document.getElementById("budget");

// EXPENSE RELATED
const remainingBudgetSpan = document.getElementById("remaining-budget");
const totalSpentSpan = document.getElementById("total-spent");


//* Window load event
window.addEventListener("load", (e) => {
  budgetSpan.innerText = localStorage.getItem("totalBudget"); //budget

//   summary
  remainingBudgetSpan.innerText = localStorage.getItem("remainingBudet");
  totalSpentSpan.innerText = localStorage.getItem("totalSpent");

//   leaderboard
  if(localStorage.getItem("formData")){
    showExpenses(JSON.parse(localStorage.getItem("formData")));
  }

//   
});
