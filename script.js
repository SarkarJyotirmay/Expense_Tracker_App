// IMPORTED

// INCOME RELATED
const incomeForm = document.getElementById("income-form");
const incomeInput = document.querySelector("#income-form > input");
const budgetSpan = document.getElementById("budget");
let totalBudget = 0;

// EXPENSE RELATED
const expenseForm = document.getElementById("expense-form");
const expensInputs = document.querySelectorAll("#expense-form div input");
const expenseBoardDiv = document.getElementById("expense-board");
const expenseContainer = document.getElementById("expense-container");
const remainingBudgetSpan = document.getElementById("remaining-budget");
const totalSpentSpan = document.getElementById("total-spent");
let remainingBudget;
let totalSpent = 0;

// Chart BUTTONS
const chartButtons = document.querySelectorAll("#chart-buttons button");
// Chart Canvas
const ctx = document.querySelector(".charts canvas");
let myChart;

const trendChart = document.getElementById("trend-chart");
let myTrendChart;
let myTrendChartData;

// storage
let expensesArr = [];

// Income form submit >  Set income
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (Number(totalBudget) > 0) {
    totalBudget = (Number(totalBudget) + Number(incomeInput.value)).toFixed(2);
  } else {
    totalBudget = Number(incomeInput.value);
  }

  budgetSpan.innerText = totalBudget;
  localStorage.setItem("totalBudget", totalBudget);
});

// Expense form submit > detail added in Expense board
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let expenseObj = {
    date: expensInputs[0].value,
    purpose: expensInputs[1].value,
    amount: expensInputs[2].value,
    id: Date.now(),
  };
  if (localStorage.getItem("formData")) {
    expensesArr = JSON.parse(localStorage.getItem("formData")); // getting data from local storage
  }
  expensesArr.push(expenseObj);

  // clear expense form and show expense to UI
  clearExpenseForm();

  //   storing items to local storage
  localStorage.setItem("formData", JSON.stringify(expensesArr));
  showExpenses(JSON.parse(localStorage.getItem("formData"))); // show data = leaderboard from local storage

  totalSpent = Number(totalSpent) + Number(expenseObj.amount);
  remainingBudget = Number(localStorage.getItem("totalBudget")) - totalSpent;
  localStorage.setItem("totalSpent", totalSpent);
  localStorage.setItem("remainingBudet", remainingBudget);
  console.log(totalSpent, remainingBudget);

  remainingBudgetSpan.innerText = localStorage.getItem("remainingBudet");
  totalSpentSpan.innerText = localStorage.getItem("totalSpent");

  //   loads chart when anythins added
  setChartType("bar");

  //! set trend
  myTrendChartData = getTrendChartData(
    JSON.parse(localStorage.getItem("formData"))
  );
  createTrendChart(myTrendChartData);
});

//! loads chart when reloaded
// bar graph
if (expensesArr.length > 0) {
  setChartType("bar");
}
// set trend
if(localStorage.getItem("formData")){
myTrendChartData = getTrendChartData(
  JSON.parse(localStorage.getItem("formData"))
);
createTrendChart(myTrendChartData);
}

// Click Chart Button >
chartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    setChartType(e.target.value);
  });
});

//! UTILITY FUNCTIONS

//* Clear expense form function
function clearExpenseForm() {
  expensInputs.forEach((input) => {
    input.value = "";
  });
}

//* Show expense function
function showExpenses(arr) {
  //   console.log(arr);

  expenseContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  arr.forEach((obj) => {
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense-div");

    const date = document.createElement("p");
    const purpose = document.createElement("p");
    const amount = document.createElement("p");
    const deleteButton = document.createElement("p");

    date.innerText = obj.date;
    purpose.innerText = obj.purpose;
    amount.innerText = obj.amount;
    deleteButton.innerText = "Del";

    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", (e) => {
      expensesArr = JSON.parse(localStorage.getItem("formData")); // getting data from LC (updated expensesArr)

      expensesArr = expensesArr.filter((object) => object.id != obj.id); //filtering after delete

      localStorage.setItem("formData", JSON.stringify(expensesArr)); // setting updated form data to LC

      showExpenses(JSON.parse(localStorage.getItem("formData")));

      console.log(localStorage.getItem("formData"));
    });

    expenseDiv.append(date, purpose, amount, deleteButton);
    fragment.append(expenseDiv);
  });
  expenseContainer.append(fragment);
}

//* Create Chart Function
function createChart(arr, type) {
  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: arr.map((obj) => obj.purpose),
      datasets: [
        {
          label: "Amount spent",
          data: arr.map((obj) => obj.amount),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: false, // Prevents Chart.js from resizing
      maintainAspectRatio: false, // Allows manual height/width control
    },
  });
}

//* Set Chart Type Function
function setChartType(chartType) {
  if (myChart) {
    myChart.destroy();
  }
  expensesArr = JSON.parse(localStorage.getItem("formData"));
  createChart(expensesArr, chartType);
}

//! Creating trend Chart
//* get Trend Chart Data function
function getTrendChartData(arr) {
  let ans = {};
  arr.forEach((obj) => {
    if (ans.hasOwnProperty(obj.date)) {
      ans[obj.date] += Number(obj.amount);
    } else {
      ans[obj.date] = Number(obj.amount);
    }
  });
  return ans;
}

//*   Create Trend Chart Function
function createTrendChart(obj) {
  if (myTrendChart) {
    myTrendChart.destroy();
  }
  let dateArr = [];
  let amountArr = [];
  for (let key in obj) {
    dateArr.push(key);
    amountArr.push(obj[key]);
  }
  myTrendChart = new Chart(trendChart, {
    type: "line",
    data: {
      labels: dateArr,
      datasets: [
        {
          label: "Amount spent",
          data: amountArr,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false, // Allows manual height/width control
    },
  });
}

export { showExpenses }; // to locale.js
