
// TAX RELATED
const taxForm = document.getElementById("tax-form");
const taxInput = document.getElementById("tax-income-input");
const preTaxIncome = document.getElementById("pre-tax-income");
const taxRate = document.getElementById("tax-rate");
const taxToPay = document.getElementById("total-tax");
const postTaxIncome = document.getElementById("post-tax-income");

// TOUR GUIDE RELATED
const tourGuideDiv = document.getElementById("tour-guide");


taxForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const income = Number(taxInput.value);
  preTaxIncome.innerText = income;

  let rate = 0;

  switch (true) {
    case income > 1000000:
      rate = 20;
      break;
    case income > 700000:
      rate = 15;
      break;
    case income > 500000:
      rate = 10;
      break;
    case income > 300000:
      rate = 5;
      break;
    default:
      rate = 0;
  }

  taxRate.innerText = `${rate}%`;

  const taxAmount = (income * rate) / 100;
  taxToPay.innerText = taxAmount;
  postTaxIncome.innerText = income - taxAmount;
});
