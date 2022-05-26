const Transaction = require("../transaction");


class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    validTransactions() {
        return this.transactions.filter(tx => {
            return Transaction.verifyTransaction(tx);
        })
    }

    transactionExists(transaction) {
        return this.transactions.find(t => t.id === transaction.id);
    }
}

module.exports = TransactionPool;