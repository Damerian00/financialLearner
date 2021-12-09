const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
const validator = document.querySelector('.validator');
const balance = document.querySelector('.bal');
const reset = document.getElementById('reset');
init();
/* function (e) {

    
} */
//with two decimals
const regex = /[0-9]+\.[0-9]{2}/;
//with one decimal
const regex1 = /[0-9]+\.[0-9]{1}/;
//without decimals
const regex2 = /[0-9]+/;

//TODO: need to format output
//validate that input doesn't have excessive numbers after decimal;
//adding .99 and 1.90 breaks it
//change localstorage to json/stringify it
deposit.addEventListener('click', function(event){
    event.preventDefault();
   let ac;
    let c = document.getElementById("amount").value;
        console.log("this is c" , typeof(c), c);
    if (c == ""){
        validator.innerHTML = "Please enter a value."
        validator.style.visibility = "visible";  
        
    } else {
        validator.style.visibility = "hidden"; 
        if (c.includes('.')){
            console.log("decimal already there")
        } else {
            ac = c + '.00'
            console.log("no decimal", ac, typeof(ac))
          
        }
        updateBalance(0, ac);
    }
});

withdraw.addEventListener('click', function(event){
    event.preventDefault();
    //add validation to make sure balance doesn't go negative
    let c = document.getElementById("amount").value;
    let curr = localStorage.getItem("balance");
    if (c == ""){
        validator.innerHTML = "Please enter a value."
        validator.style.visibility = "visible";  
        return
    } 
    else if (c > curr){
        validator.innerHTML = "Cannot withdraw more than your balance.";
        validator.style.visibility = "visible";
        return
    }
    else {
        validator.style.visibility = "hidden"; 
    }
    updateBalance(1, c);
});

reset.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.setItem("balance", "0.00");
    displayBalance("0.00");

});

function init () {

    if(localStorage.getItem("balance") === null || isNaN(localStorage.getItem("balance"))) {
        localStorage.setItem("balance", "0.00");
        displayBalance("0.00");
    }
    else {
        let bal = localStorage.getItem("balance");
        displayBalance(bal);
    }
}

function updateBalance(operation, amount){
    //add
    let c;
    console.log("this is the amount" , amount)
    let currentBalance = localStorage.getItem("balance");
    if (operation == 0) {
        let curr = parseFloat(currentBalance);
        console.log("this is the currr" , curr)
        let transaction= parseFloat(amount);
        console.log("this is the transaction" , transaction)
        c = curr + transaction;
        localStorage.setItem("balance", c.toString());
    }
    //subtract
    else {
        
        let curr = parseFloat(currentBalance);
        let transaction = parseFloat(amount);
        c = curr - transaction;
        localStorage.setItem("balance", c.toString());
    }

    displayBalance(c.toString());
}

function displayBalance(value) {
    //value is a string
    //use .split to check formatting and adjust for display
    value.slice(0, (value.indexOf('.')) + 3);
    console.log("display balance called", value);
    balance.innerHTML = `$${value}`;
    
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