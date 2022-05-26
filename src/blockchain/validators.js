const { VALIDATOR_FEE } = require("../config");

class Validators {
    constructor() {
        this.list = [];
    }
  
    update(transaction) {
        if (transaction.amount == VALIDATOR_FEE && transaction.to == "0") {
            this.list.push(transaction.from);
            return true;
        }
        return false;
    }
  }
  

  module.exports = Validators;