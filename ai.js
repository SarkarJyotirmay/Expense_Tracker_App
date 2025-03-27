const aiResponseDiv = document.getElementById("ai-response");
const askAIBtn = document.getElementById("ask-ai-btn");

let expensesArr = JSON.parse(localStorage.getItem("formData")) || [];

askAIBtn.addEventListener("click", (e) => {
  aiResponseDiv.innerHTML = `Loading ...`;
  setTimeout(() => {
    if (findTotalSpentAmount(expensesArr) <= 10000) {
      aiResponseDiv.innerHTML = `
            <p>1️⃣ Great Spending Habits! 🎉 You’re doing a good job keeping your expenses in check. Your spending isn’t excessive, which is a great sign of financial discipline.</p>
            <p>2️⃣ Balanced Approach 💰 You seem to have a good balance between necessities and discretionary spending. This helps ensure you’re enjoying life while maintaining financial stability.</p>
            <p>3️⃣ Build a Safety Net ⚠️ Even though your spending is under control, it’s always wise to have an emergency fund. Unexpected expenses can arise, so saving at least 3-6 months’ worth of expenses will keep you financially secure.</p>
            `;
    } else if (findTotalSpentAmount(expensesArr) <= 50000) {
      aiResponseDiv.innerHTML = `
            <p>1️⃣ Watch Your Expenses! 😬 Your spending seems to be on the higher side. While it's manageable now, it's important to ensure it aligns well with your income and financial goals.</p>
            <p>2️⃣ Risk of Overspending! ⚠️ If expenses continue at this level, they might start affecting your ability to save and invest for the future. Keeping track of where your money goes can help maintain financial stability.</p>
            <p>3️⃣ Maintain a Safety Cushion! 💡 While spending isn't inherently bad, make sure you are consistently saving and maintaining an emergency fund. A little adjustment now can make a big difference in long-term financial security.</p>
            `;
    }
    else if(findTotalSpentAmount(expensesArr) <= 100000){
    aiResponseDiv.innerHTML = `
        <p>1️⃣ Slightly on the Higher Side! 🤔 Your spending seems a bit high, which might reduce flexibility in your financial planning. Keeping an eye on discretionary expenses can help maintain a better balance.</p>
        <p>2️⃣ Could Impact Savings! ⚠️ While you're managing expenses, this level of spending might slow down wealth accumulation. A small adjustment could free up more for future investments or unexpected needs.</p>
        <p>3️⃣ Potential Financial Strain Ahead! 🚨 If spending remains at this level without enough savings, it could lead to financial stress down the line. Prioritizing savings and an emergency fund now will help ensure long-term stability.</p>
    `
    }
    else if(findTotalSpentAmount(expensesArr) <= 200000){
        aiResponseDiv.innerHTML = `
            <p>🤔 Your Expences are goint too high. Check your spendings once more.</p>
            <p>💡 Try to spent less mone. It can cause harm to your savings</p>
            <p>3️⃣ Potential Financial Strain Ahead! 🚨 If spending remains at this level without enough savings, it could lead to financial stress down the line. Prioritizing savings and an emergency fund now will help ensure long-term stability.</p>
        `
    }
  }, 1000);
});

//* Find total spent amount function
function findTotalSpentAmount(arr) {
  let res = 0;
  res = arr.reduce((acc, curr) => {
    return acc + Number(curr.amount);
  }, 0);
  return res;
}
