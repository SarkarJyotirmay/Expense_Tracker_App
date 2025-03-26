// SIGN IN / SIGN UP RELATED
const signUpScreen = document.getElementById("sign-up-screen");
const signInScreen = document.querySelector("#sign-in-screen");
const signUpButton = document.getElementById("sign-up-button");
const signInLink = document.getElementById("sign-in-link");
const allCrossBUtton = document.querySelectorAll(".cross");
const signUpForm = document.querySelector("#sign-up-form");
const signUpInputs = document.getElementsByClassName("sign-up-input");
const signInForm = document.querySelector("#sign-in-form");
const signInInputs = document.getElementsByClassName("sign-in-input");

// NAV BAR RELATED
const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const menu = document.getElementById("menu");
const wrapper = document.querySelector("#wrapper");



// Click Sign Up button >
signUpButton.addEventListener("click", (e) => {
  signUpScreen.classList.toggle("close");
});

// Click Sign in link >
signInLink.addEventListener("click", (e) => {
  signUpScreen.classList.add("close");
  signInScreen.classList.remove("close");
});

// click on cross in sign up sign in
for (let i = 0; i < allCrossBUtton.length; i++) {
  allCrossBUtton[i].addEventListener("click", (e) => {
    e.target.parentNode.parentNode.parentNode.classList.add("close");
  });
}

// Submit Sign Up form >
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInfo = {
    name: signUpInputs[0].value,
    email: signUpInputs[1].value,
    password: signUpInputs[2].value,
  };
  localStorage.setItem("User Information", JSON.stringify(userInfo));
  signUpScreen.classList.add("close");

  signUpButton.innerHTML = `<div style="display:flex; justify-content: space-between; align-items: center; min-width:100px;">
    <span><span style="padding-right:10px">${signUpInputs[0].value}</span> <i class="fa-solid fa-user"></i></span>
    <span><i class="fa-solid fa-caret-down"></i></span>
    </div>`;

  alert("Signed Up Successfully");
});

// Submit Sign in form
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // checking user details form local storage
  const filledInfo = {
    email: signInInputs[0].value,
    password: signInInputs[1].value,
  };

  let data = JSON.parse(localStorage.getItem("User Information"));
  console.log(data);
  console.log(filledInfo);

  let isMatched = true;

  for (let key in filledInfo) {
    if (filledInfo[key] != data[key]) {
      isMatched = false;
      console.log("Data match nhi hua bhai");
    }
  }

  if (isMatched) {
    signInScreen.classList.add("close");
    signUpButton.innerHTML = `<div style="display:flex; justify-content: space-between; align-items: center; min-width:100px;">
    <span><span style="padding-right:10px">${signUpInputs[0].value}</span> <i class="fa-solid fa-user"></i></span>
    <span><i class="fa-solid fa-caret-down"></i></span>
    </div>`;
  } else {
    alert("Please Enter Valid Credentials");
  }
});

menuToggle.addEventListener("click", () => {
  menu.classList.remove("hidden"); // Show menu
  menuToggle.classList.add("hidden"); // Hide hamburger
});


// MENU
closeMenu.addEventListener("click", () => {
  menu.classList.add("hidden"); // Hide menu
  menuToggle.classList.remove("hidden"); // Show hamburger
});

// Optional: Close menu when clicking outside (for small screens)
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.add("hidden");
    menuToggle.classList.remove("hidden");
  }
});
