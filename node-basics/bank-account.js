var accounts = [];

// createAccount
function createAccount(account) {
  accounts.push(account);
  return account;
}

// getAccount
function getAccount(username) {
  var matchedAccount;

  var i = 0;
  while (i < accounts.length) {
    if (accounts[i].username === username) {
      matchedAccount = accounts[i];
    }
    i++;
  }

  return matchedAccount;
}

// deposit
function deposit(account, amount) {
  if (typeof amount === 'number') {
    account.balance += amount;
  }
  else {
    console.log('Amount is not a number! Could not deposit.');
  }
}

// withdraw
function withdraw(account, amount) {
  if (typeof amount === 'number') {
    account.balance -= amount;
  }
  else {
    console.log('Amount is not a number! Could not deposit.');
  }
}

// getBalance
function getBalance(account) {
  return account.balance;
}

function createBalanceGetter(account) {
  return function() {
    return account.balance;
  }
}

createAccount({ "username": "Dan", balance: 345.90 });

var danAccountBalanceGetter = createBalanceGetter(getAccount("Dan"));
console.log("Current Balance of Dan's Account " + danAccountBalanceGetter());
