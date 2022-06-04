const { VALIDATOR_FEE } = require("../config");

class Validators {
    constructor() {
        this.list = ["fc4423989c9b7c27394ad4f0dc76faa3f3e2f5d49afa3098b3b89421e110d0a9"];
    }
  
    update(transaction) {
        if (transaction.output.amount == VALIDATOR_FEE && transaction.output.to == "0") {
            this.list.push(transaction.input.from);
            return true;
        }
        return false;
    }
  }
  

  module.exports = Validators;