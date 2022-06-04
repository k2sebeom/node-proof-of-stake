const { INITIAL_BALANCE } = require("../config");


class Account {
    constructor() {
      this.addresses = ["fc4423989c9b7c27394ad4f0dc76faa3f3e2f5d49afa3098b3b89421e110d0a9"];
      this.balance = {"fc4423989c9b7c27394ad4f0dc76faa3f3e2f5d49afa3098b3b89421e110d0a9": INITIAL_BALANCE};
    }
  
    initialize(address) {
      if (this.balance[address] == undefined) {
        this.balance[address] = 0;
        this.addresses.push(address);
      }
    }
  
    transfer(from, to, amount) {
      this.initialize(from);
      this.initialize(to);
      this.increment(to, amount);
      this.decrement(from, amount);
    }
  
    increment(to, amount) {
      this.balance[to] += amount;
    }
  
    decrement(from, amount) {
      this.balance[from] -= amount;
    }
  
    getBalance(address) {
      this.initialize(address);
      return this.balance[address];
    }
  
    update(transaction) {
      let amount = transaction.output.amount;
      let from = transaction.input.from;
      let to = transaction.output.to;
      this.transfer(from, to, amount);
    }
    
    transferFee(block, transaction) {
        let amount = transaction.output.fee;
        let from = transaction.input.from;
        let to = block.validator;
        this.transfer(from, to, amount);
    }
}
  
  module.exports = Account;