let correctPin = "1234";
let balance = 0;
let transactionHistory = [];
let currentAction = "";


window.onload = function() {
    const savedBalance = localStorage.getItem("atm_balance");
    const savedHistory = localStorage.getItem("atm_history");

    if (savedBalance !== null) {
        balance = parseFloat(savedBalance);
    } else {
        balance = 1000;
    }
    
    if (savedHistory !== null) {
        transactionHistory = JSON.parse(savedHistory);
    } else {
        transactionHistory = [];
    }
    
};

function saveData() {
    localStorage.setItem("atm_balance", balance);
    localStorage.setItem("atm_history", JSON.stringify(transactionHistory));
}

function verifyPin() {
    const enteredPin = document.getElementById("pinInput").value;
    if (enteredPin === correctPin) {
        document.getElementById("pinSection").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("atmTitle").innerText = "Select Option";
    } else {
        alert("Incorrect PIN! Try Again.");
    }
    const cardSlot = document.getElementsByClassName("card-slot")[0];
    cardSlot.innerHTML = ``;
}

function checkBalance() {
    alert(`Your current balance is ₹${balance}`);
}

function depositMoney() {
    currentAction = "deposit";
    document.getElementById("menu").style.display = "none";
    document.getElementById("actions").style.display = "block";
    document.getElementById("atmTitle").innerText = "Deposit Amount";
}

function withdrawMoney() {
    currentAction = "withdraw";
    document.getElementById("menu").style.display = "none";
    document.getElementById("actions").style.display = "block";
    document.getElementById("atmTitle").innerText = "Withdraw Amount";
}

function confirmAction() {
    const amount = parseFloat(document.getElementById("amountInput").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    const dateTime = new Date().toLocaleString();

    if (currentAction === "deposit") {
        balance += amount;
        transactionHistory.push(`Deposited ₹${amount} on ${dateTime}`);
        alert(`Deposited ₹${amount} successfully!`);
    } else if (currentAction === "withdraw") {
        if (amount <= balance) {
            balance -= amount;
            transactionHistory.push(`Withdrew ₹${amount} on ${dateTime}`);
            alert(`Withdrew ₹${amount} successfully!`);
        } else {
            alert("Insufficient balance!");
            return;
        }
    }

    saveData();  
    document.getElementById("amountInput").value = "";
    document.getElementById("actions").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("atmTitle").innerText = "Select Option";
}

function viewHistory() {
    if (transactionHistory.length === 0) {
        alert("No transactions yet.");
    } else {
        alert("Transaction History:\n\n" + transactionHistory.join("\n"));
    }
}

function exitATM() {
    alert("Thank you for using our ATM!");
    location.reload();
}
