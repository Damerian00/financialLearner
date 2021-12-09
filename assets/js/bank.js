/* sets up global variables */
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
const validator = document.querySelector(".validator");
const balance = document.querySelector(".bal");
const reset = document.getElementById("reset");
//Array is (float, string) pairs
let transactions = [];

/* initializes the program */
init();

//TODO:Validate number entered is positive only

/* Deposit Function here with validation*/
deposit.addEventListener("click", function (event) {
  event.preventDefault();

  let c = document.getElementById("amount").value;
  console.log("this is c", typeof c, c);
  /* checks to see if a value was input */
  if (c == "") {
    validator.innerHTML = "Please enter a value.";
    validator.style.visibility = "visible";
  } else if (c <= 0) {
    validator.innerHTML = "Must enter positive number.";
    validator.style.visibility = "visible";
  } else {
    validator.style.visibility = "hidden";

    updateBalance(0, c);
  }
});
/* Withdraw function here with validation*/
withdraw.addEventListener("click", function (event) {
  event.preventDefault();
  let c = document.getElementById("amount").value;
  let curr = JSON.parse(localStorage.getItem("balance"));
  //evaluates that there is an input
  if (c == "") {
    validator.innerHTML = "Please enter a value.";
    validator.style.visibility = "visible";
    return;
  }
  //evaluates if the withdraw would make the balance go negative
  else if (c > curr) {
    validator.innerHTML = "Cannot withdraw more than your balance.";
    validator.style.visibility = "visible";
    return;
  } else if (c == 0) {
    validator.innerHTML = "Cannot withdraw nothing.";
    validator.style.visibility = "visible";
  } else {
    validator.style.visibility = "hidden";
  }
  updateBalance(1, c);
});
/* Reset Function
triggered by button click, resets balance to 0 */
reset.addEventListener("click", function (event) {
  event.preventDefault();
  let initBal = 0.0;
  localStorage.setItem("balance", JSON.stringify(initBal));
  displayBalance("0.00");
});

/*Initialize Function
sets balance to 0 in local storage and calls to update display*/
function init() {
  if (
    JSON.parse(localStorage.getItem("balance")) === null ||
    isNaN(JSON.parse(localStorage.getItem("balance")))
  ) {
    let initialValue = 0.0;
    localStorage.setItem("balance", JSON.stringify(initialValue));
    displayBalance("0.00");
  } else {
    transactions.push([0.00, "Starting Balance"]);
    let bal = JSON.parse(localStorage.getItem("balance"));
    displayBalance(bal.toString());
  }
}
/*Update Balance Function
takes boolean (0/1) for deposit/withdraw and string
calculates new balance*/
function updateBalance(operation, amount) {
  //add
  let c;
  console.log("this is the amount", amount);
  let currentBalance = JSON.parse(localStorage.getItem("balance"));
  if (operation == 0) {
    let curr = parseFloat(currentBalance);
    console.log("this is the currr", curr);
    let transaction = parseFloat(amount);
    console.log("this is the transaction", transaction);
    c = curr + transaction;
    localStorage.setItem("balance", JSON.stringify(c));
  }
  //subtract
  else {
    let curr = parseFloat(currentBalance);
    let transaction = parseFloat(amount);
    c = curr - transaction;
    localStorage.setItem("balance", JSON.stringify(c));
  }

  c = c.toFixed(2);
  displayBalance(c.toString());
}

/* Display Balance Function
    Takes a string, updates balance HTML */
function displayBalance(value) {
  let ac;
  //value is a string
  if (value.includes(".")) {
    console.log("decimal already there");
    ac = value;
  } else {
    ac = value + ".00";
    console.log("no decimal", ac, typeof ac);
  }
  // ac.slice(0, (ac.indexOf('.')) + 3);
  console.log("display balance called", ac);
  balance.innerHTML = `$${ac}`;
}

/* 
init();
regex = \d+\.+\d{0,2}
localStorage.setItem("City", JSON.stringify(searchResults));

function init (){
    if (localStorage.getItem("City") != null) {
         searchResults = JSON.parse(localStorage.getItem("City"));
 
        
        }
}
` $ ${bal}`
*/

// a = document.querySelector('#deposit')
// a.addEventListener('click', functioinblah)
