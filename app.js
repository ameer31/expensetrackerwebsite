function signup() {
    var email = document.getElementById('semail').value
    var pass = document.getElementById('spass').value
    localStorage.setItem('Email', email)
    localStorage.setItem('Password', pass)
    location.href = 'signin.html'
}

function signin() {
    var email = document.getElementById('lemail').value
    var pass = document.getElementById('lpass').value
    if (localStorage.getItem('Email') == email && localStorage.getItem('Password') == pass) {
        location.href = './welcome.html'
    }
    else {
        alert(' sign up fisrt')
        location.href = './signup.html'
    }

}

var expenses = [];
var totalAmount = 0;

var categorySelect = document.getElementById('Category-select');
var amountInput = document.getElementById('amount-input');
var dateInput = document.getElementById('date-input');
var expenseBody = document.getElementById('expensebody');
var totalAmountCell = document.getElementById('total-amount');
var addBtn = document.getElementById('btn');

function addExpense() {
    var category = categorySelect.value;
    var amount = parseFloat(amountInput.value);
    var date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (date === '') {
        alert('Please select a date');
        return;
    }

    expenses.push({ category, amount, date });

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    var newRow = expenseBody.insertRow();
    var categoryCell = newRow.insertCell(0);
    var amountCell = newRow.insertCell(1);
    var dateCell = newRow.insertCell(2);
    var deleteCell = newRow.insertCell(3);
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        var index = expenses.indexOf(expense);
        if (index !== -1) {
            totalAmount -= expenses[index].amount;
            totalAmountCell.textContent = totalAmount.toFixed(2);
            expenses.splice(index, 1);
            expenseBody.removeChild(newRow);
        }
    });

    var expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

addBtn.addEventListener('click', addExpense);

