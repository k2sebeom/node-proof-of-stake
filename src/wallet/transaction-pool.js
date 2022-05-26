const { TRANSACTION_THRESHOLD } = require("../config");
const Transaction = require("../transaction");


class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
        return this.transactions.length >= TRANSACTION_THRESHOLD;
    }

    validTransactions() {
        return this.transactions.filter(tx => {
            return Transaction.verifyTransaction(tx);
        })
    }

    transactionExists(transaction) {
        return this.transactions.find(t => t.id === transaction.id);
    }

    clear() {
        this.transactions = [];
    }
}

module.exports = TransactionPool;