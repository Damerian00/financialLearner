/* sets up global variables */
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
const validator = document.querySelector(".validator");
const balance = document.querySelector(".bal");
const reset = document.getElementById("reset");
const history = document.querySelector(".history");
//Array is (float, string) pairs
let transactions = [];

/* initializes the program */
init();

//TODO:

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
/* Delete All Function
triggered by button click, resets balance to 0,
sets transactions to initial balance */
reset.addEventListener("click", function (event) {
    //TODO - need to clear transaction history
  event.preventDefault();
  let initBal = 0.0;
  localStorage.setItem("balance", JSON.stringify(initBal));

  console.log("check transactions", transactions);
  displayBalance("0.00");
  while (history.firstChild) {
      history.removeChild(history.firstChild);
  }
  clearTransactions();
  displayTransactions();
});
// while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
// }


/*Initialize Function
sets balance to 0 in local storage, 
sets transaction to initial balance, 
and makes a call to update display*/
function init() {
  if (
    JSON.parse(localStorage.getItem("balance")) === null ||
    isNaN(JSON.parse(localStorage.getItem("balance")))
  ) {
    let initialValue = 0.0;
    localStorage.setItem("balance", JSON.stringify(initialValue));
    clearTransactions();
    displayBalance("0.00");
  } else {
    let bal = JSON.parse(localStorage.getItem("balance"));
    let transactions = JSON.parse(localStorage.getItem("transactions"));
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
    c = c.toFixed(2);
    transactions.push([c, "Deposit"]);
    storeTransactions();
    localStorage.setItem("balance", JSON.stringify(c));
  }
  //subtract
  else {
    let curr = parseFloat(currentBalance);
    let transaction = parseFloat(amount);
    c = curr - transaction;
    c = c.toFixed(2);
    transactions.push([c, "Withdrawl"]);
    storeTransactions();
    localStorage.setItem("balance", JSON.stringify(c));
  }
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
  //test();
  displayTransactions();
}

/*Updates localStorage transactions array*/
function storeTransactions(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

/*clears localStorage transactions and sets it to initial balance */
function clearTransactions(){
    transactions = [["0.00", "Initial Balance"]];
    console.log("display transactions", transactions);
    storeTransactions();
}

/*Propagates the transaction history */
function displayTransactions(){
    //TODO - update html list through pops
    let trans = JSON.parse(localStorage.getItem("transactions"));
    let len = trans.length;
    console.log(trans)

        for(let i = 0; i < 3 && i < len; i++){
            //populate list
            let pair = trans.pop();
            console.log("displauy pair", pair);
            let amount = pair[0];
            console.log(amount);
            let transType = pair[1];
            console.log(transType);
            const li = document.createElement('li');
            console.log("display li", li);
            li.innerHTML = `$${amount} <span>${transType}</span>`;
            
        //    span = span.innerHTML = transType;
            
            history.prepend(li);
    
        }
    
}

function test(){
    /* let li = document.createElement('li');
    li.innerHTML = "0.00";
    history.prepend(li); */
    let bal = '0.00'
    let li = document.createElement('li');
    console.log(li, history);
    li.innerHTML = bal;
    history.appendChild(li);
}
