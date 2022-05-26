const { INITIAL_BALANCE } = require('../config');
const Transaction = require('../transaction');
const ChainUtil = require('../utils/chain');


class Wallet {
    constructor(secret) {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair(secret);
        this.publicKey = this.keyPair.getPublic("hex");
    }

    toString() {
        return `Wallet - 
            publicKey: ${this.publicKey.toString()}
            balance  : ${this.balance}`;
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash).toHex();
    }

    createTransaction(to, amount, type, blockchain, transactionPool) {
        let tx = Transaction.newTransaction(this, to, amount, type);
        transactionPool.addTransaction(tx);
        return tx;
    }
}

module.exports = Wallet;