//! THIS IS A FILE TO TEST AND SELECT POPER DATA STRUCTURE FOR UTILITY FUNCTIONS
 
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
    return acc.amount + curr.amount;
  });
  return res;
}
// console.log(totalSpentAmountFnc(data));

