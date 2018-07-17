var argv = require('yargs')
    .command('create', 'Stores a new password.', function(createYargs) {
        createYargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name of website or application for your account.',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Username of the account to which the password belongs.',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Password of the account to be stored',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Your Master Password.',
                type: 'string'
            }
        }).help('help');
    })
    .command('get', 'Retrieves a username and password for an application.', function(getYargs) {
        getYargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name of website or application to be retrieved.',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Your Master Password.',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;

var crypto = require('crypto-js');
var storage = require('node-persist');

storage.initSync();

function getAccounts(masterPassword) {
    var encryptedAccounts = storage.getItemSync('accounts');
    var accounts = [];

    if (typeof encryptedAccounts !== 'undefined') {
        var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }

    return accounts;
}

function saveAccounts(accounts, masterPassword) {
    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync('accounts', encryptedAccounts.toString());

    return accounts;
}

function createAccount(account, masterPassword) {
    var accounts = getAccounts(masterPassword);

    accounts.push(account);

    saveAccounts(accounts, masterPassword);

    return account;
}

function getAccount(accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);

    var foundAccount;
    accounts.forEach(function(account) {
        if (account.name === accountName) {
            foundAccount = account;
        }
    });

    return foundAccount;
}

var command = argv._[0];

if (command === 'create') {
    try {
        var createdAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
        }, argv.masterPassword);
        console.log('Account created!');
        console.log(createdAccount);
    } catch(e) {
        console.log("Unable to create account!");
    }
} else if (command === 'get') {
    try {
        var retrievedAccount = getAccount(argv.name, argv.masterPassword);
        if (typeof retrievedAccount !== 'undefined') {
            console.log(retrievedAccount);
        } else {
            console.log('Password account for name could not be found!');
        }
    } catch(e) {
        console.log("Unable to get account!");
    }
}
