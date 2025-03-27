
// TAX RELATED
const taxForm = document.getElementById("tax-form");
const taxInput = document.getElementById("tax-income-input");
const preTaxIncome = document.getElementById("pre-tax-income");
const taxRate = document.getElementById("tax-rate");
const taxToPay = document.getElementById("total-tax");
const postTaxIncome = document.getElementById("post-tax-income");

// TOUR GUIDE RELATED
const tourGuideDiv = document.getElementById("tour-guide");
const tourGuideBtn = document.getElementById("tour-guide-btn");
const tourDivs = document.querySelectorAll(".tour");
const tourImages = document.querySelectorAll(".tour > img");
const tourDestination = document.querySelectorAll(".tour > p");
let baseImagePath = "./assets/"

let income;

// Submit tax form >
taxForm.addEventListener("submit", (e) => {
  e.preventDefault();
   income = Number(taxInput.value);
  preTaxIncome.innerText = income;

  let rate = 0;

  switch (true) {
    case income > 1000000:
      rate = 15;
      break;
    case income > 700000:
      rate = 12;
      break;
    case income > 500000:
      rate = 7;
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

  tourGuideBtn.classList.remove("close");
});

// Click on tour button > 
tourGuideBtn.addEventListener("click",(e)=>{
  tourGuideDiv.classList.remove("close");

  if(income >= 1000000){
    tourImages[0].src = `${baseImagePath}1-kashmir.webp`
    tourImages[1].src = `${baseImagePath}0-goa.avif`
    tourImages[2].src = `${baseImagePath}2-maldives.jpg`

    tourDestination[0].innerText = "KASHMIR"
    tourDestination[1].innerText = "GOA"
    tourDestination[2].innerText = "MALDIVES"
  }
  else if(income >= 700000){
    tourImages[0].src = `${baseImagePath}3-thailand.jpg`
    tourImages[1].src = `${baseImagePath}4-sikkim.jpg`
    tourImages[2].src = `${baseImagePath}5-leh.jpg`

    tourDestination[0].innerText = "THAILAND"
    tourDestination[1].innerText = "SIKKIM"
    tourDestination[2].innerText = "LEH"
  }
  else if(income >= 500000){
    tourImages[0].src = `${baseImagePath}9-bhutan.jpg`
    tourImages[1].src = `${baseImagePath}10-kerala.webp`
    tourImages[2].src = `${baseImagePath}11-kutch.jpg`

    tourDestination[0].innerText = "BHUTAN"
    tourDestination[1].innerText = "KERALA"
    tourDestination[2].innerText = "RUN of KUTCH"
  }
  else {
    tourImages[0].src = `${baseImagePath}6-digha.jpg`
    tourImages[1].src = `${baseImagePath}7-tajmahal.jpg`
    tourImages[2].src = `${baseImagePath}8-duars.jpg`

    tourDestination[0].innerText = "DIGHA"
    tourDestination[1].innerText = "TAJ MAHAL"
    tourDestination[2].innerText = "DUARS"
  }

})