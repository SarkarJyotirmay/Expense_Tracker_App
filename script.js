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

// delete all button
const deleteAllBtn = document.getElementById("delete-all-btn");

// storage array ....linked to Local Storage
let expensesArr = [];
//! ++++++
if (localStorage.getItem("formData")) {
  expensesArr = JSON.parse(localStorage.getItem("formData"));
}

// Income form submit >  Set income
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (Number(incomeInput.value) <= 0) {
    alert("Please Enter amount greater than 0");
    return;
  }

  if (localStorage.getItem("totalBudget")) {
    console.log("Budget Hai!", localStorage.getItem("totalBudget"));
    totalBudget =
      Number(localStorage.getItem("totalBudget")) + Number(incomeInput.value);
  } else {
    totalBudget = Number(incomeInput.value);
  }
  budgetSpan.innerText = totalBudget;
  localStorage.setItem("totalBudget", totalBudget);

  // remaining budget
  if (localStorage.getItem("remainingBudget")) {
    remainingBudget =
      Number(localStorage.getItem("remainingBudget")) +
      Number(incomeInput.value);
    remainingBudgetSpan.innerText = remainingBudget;
    localStorage.setItem("remainingBudget", remainingBudget);
  } else {
    remainingBudget = Number(incomeInput.value);
    remainingBudgetSpan.innerText = remainingBudget;
    localStorage.setItem("remainingBudget", remainingBudget);
  }
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

  // spent amount
  if (localStorage.getItem("formData")) {
    totalSpent = Number(findTotalSpentAmount(expensesArr)); //! +++++

    // if expense exceeds or near budget  //!++++
    if (totalSpent > totalBudget) {
      alert("Oops, Budget is Over Add More!");
      expensesArr = JSON.parse(localStorage.getItem("formData"));
      expensesArr.splice((expensesArr.length - 1), 1);
      // localStorage.setItem("formData",expensesArr); //This trick did not worked
      //! FIX NEEDED Edge Case : If total spent surpases remaining total budget, need to stop appending expense object to the array.

      showExpenses(expensesArr);
      return; //! stops execution
    } else if (totalSpent >= (totalBudget * 80) / 100) {
      alert("You have Used More Than 80% of your budget!");
    }
  } else {
    totalSpent = Number(expenseObj.amount);
    if(totalSpent >= totalBudget){
      alert("You have exhausted your Budget");
      remainingBudget = 0;
      localStorage.setItem("remainingBudget", remainingBudget);
    }
    else if (totalSpent >= (totalBudget * 80) / 100) {
      alert("You have Used More Than 80% of your budget!");
    }
  }

  // remaining budget
  remainingBudget =
    Number(localStorage.getItem("totalBudget")) - Number(totalSpent);

  localStorage.setItem("totalSpent", totalSpent);
  localStorage.setItem("remainingBudget", remainingBudget);
  // console.log(totalSpent, remainingBudget);

  remainingBudgetSpan.innerText = localStorage.getItem("remainingBudget");
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
if (localStorage.getItem("formData")) {
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

// Click delete all button >
deleteAllBtn.addEventListener("click", (e)=>{
  console.log("hello from delete all");

  localStorage.removeItem("formData")
  localStorage.removeItem("totalBudget");
  localStorage.removeItem("remainingBudget");
  localStorage.removeItem("totalSpent");
  expensesArr =  [];
  totalBudget = 0;
  remainingBudget = 0;
  totalSpent = 0;
  // console.log(expensesArr);
  showExpenses(expensesArr);
 if(myChart){
  myChart.destroy();
 }
 if(myTrendChart){
  myTrendChart.destroy();
 }
  

  budgetSpan.innerText = totalBudget;
  remainingBudgetSpan.innerText = remainingBudget;
  totalSpentSpan.innerText = totalSpent;

  window.location.reload();
})

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

      expensesArr = expensesArr.filter((object) => object.id != obj.id); //filtering after delete = updated expensesArr

      localStorage.setItem("formData", JSON.stringify(expensesArr)); // setting updated form data to LC

      showExpenses(JSON.parse(localStorage.getItem("formData"))); //table updated

      // Update Summary //!+++++
      // spent amount
      if (localStorage.getItem("formData")) {
        expensesArr = JSON.parse(localStorage.getItem("formData"));
        totalSpent = Number(findTotalSpentAmount(expensesArr));
      } else {
        totalSpent = Number(expenseObj.amount);
      }
      // remaining budget
      remainingBudget =
        Number(localStorage.getItem("totalBudget")) - Number(totalSpent);

      localStorage.setItem("totalSpent", totalSpent);
      localStorage.setItem("remainingBudget", remainingBudget);
      // console.log(totalSpent, remainingBudget);

      remainingBudgetSpan.innerText = localStorage.getItem("remainingBudget");
      totalSpentSpan.innerText = localStorage.getItem("totalSpent");

      // updated bar graph //! ++++
      if (expensesArr.length > 0) {
        setChartType("bar");
      }
      // updated trend chart //! ++++
      if (localStorage.getItem("formData")) {
        myTrendChartData = getTrendChartData(
          JSON.parse(localStorage.getItem("formData"))
        );
        createTrendChart(myTrendChartData);
      }
      // console.log(localStorage.getItem("formData"));
    });

    expenseDiv.append(date, purpose, amount, deleteButton);
    fragment.append(expenseDiv);
  });
  expenseContainer.append(fragment);
}

//* Find Total Spent Function
function findTotalSpentAmount(arr) {
  let res = 0;
  res = arr.reduce((acc, curr) => {
    return acc + Number(curr.amount);
  }, 0);
  return res;
}

//* sort expense array : update this feature later sort based on string date not id
function sortMyExpenseArr(arr){
  arr.sort((a,b)=>{
    return Number(a["id"]) - Number(b["id"])
  })
  // console.log(arr);
  return arr;
} 

//* Create Chart Function
function createChart(arr, type) {
  //! ******* 
  let objChartData = getOtherChartData(arr);
  let purposes = [];
  let amounts = [];
  for(let key in objChartData){
    purposes.push(key);
    amounts.push(objChartData[key])
  }
  //! *******
  myChart = new Chart(ctx, {
    type: type,
    data: {
      // labels: arr.map((obj) => obj.purpose),
      labels: purposes, //! **++
      datasets: [
        {
          label: "Amount spent",
          // data: arr.map((obj) => obj.amount),
          data: amounts, //! **+++
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

//* Get Other Chart data function : returns Object for create chart function
function getOtherChartData(arr){
  let ans = {};
  arr.forEach((obj) => {
    if(ans.hasOwnProperty(obj.purpose)){
      ans[obj.purpose] += Number(obj.amount); 
    }
    else{
      ans[obj.purpose] = Number(obj.amount);
    }
  });
  return ans;
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
