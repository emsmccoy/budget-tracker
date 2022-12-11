const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expenses = document.getElementById('expenses');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function createID() {
    return Math.floor(Math.random() * 100000000);
}

function drawItem(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'negative' : 'positive');
    item.innerHTML = `
        ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}€</span> <button class="delete-button" onclick="deleteTransaction(${transaction.id
        })">DELETE</button>
      `;
    list.appendChild(item);
}

function addTransaction(e) {
    e.preventDefault();
    const transaction = {
        id: createID(),
        text: text.value,
        amount: +amount.value
    };
    transactions.push(transaction);
    drawItem(transaction);
    saveValues();
    saveLocalStorage();
    text.value = '';
    amount.value = '';
}


function saveValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const incomeAmount = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expenseAmount = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `${total}€`;
    income.innerText = `${incomeAmount}€`;
    expenses.innerText = `${expenseAmount}€`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    saveLocalStorage();

    init();
}

function saveLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(drawItem);
    saveValues();
}

init();

form.addEventListener('submit', addTransaction);