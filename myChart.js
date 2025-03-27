//! THIS IS A FILE TO TEST AND SELECT PROPER DATA STRUCTURE FOR UTILITY FUNCTIONS
 
// dummy data
let data = [
  {
    date: "23/12/24",
    purpose: "food",
    amount: "5000",
    id: Date.now(),
  },
  {
    date: "23/12/24",
    purpose: "fun",
    amount: "3000",
    id: Date.now(),
  },
  {
    date: "24/12/24",
    purpose: "game",
    amount: "2000",
    id: Date.now(),
  },
  {
    date: "23/12/24",
    purpose: "food",
    amount: "5000",
    id: Date.now(),
  },
];



function getTrendChartData(arr){
  let ans = {};
  arr.forEach((obj) => {
    if(ans.hasOwnProperty(obj.date)){
      ans[obj.date] += Number(obj.amount); 
    }
    else{
      ans[obj.date] = Number(obj.amount);
    }
  });
  return ans;
}

// let res = fnc(data)

// retutns 
// {date : amount, date : amount, date : amount}

function totalSpentAmountFnc(arr) {
  let res = 0;
  res = arr.reduce((acc, curr) => {
    return acc + curr.amount;
  },0);
  return res;
}
// console.log(totalSpentAmountFnc(data));

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

let otherData = getOtherChartData(data);
// console.log(otherData);


// Sorting leaderboard array

let leaderBoard = [{
  date: "1/1/1",
  purpose: "",
  amount: "",
  id: "1235",
},
{
  date: "1/1/1",
  purpose: "",
  amount: "",
  id: "1234",
},
{
  date: "1/1/1",
  purpose: "",
  amount: "",
  id: "1236",
}
]

function sortMyExpenseArr(arr){
  arr.sort((a,b)=>{
    return Number(a["id"]) - Number(b["id"])
  })
  // console.log(arr);
  return arr;
}

// console.log(sortMyExpenseArr(leaderBoard));



