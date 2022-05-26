class Stake {
    constructor() {
        this.addresses = [];
        this.balance = {};
    }

    initialize(address) {
        if (this.balance[address] == undefined) {
            this.balance[address] = 0;
            this.addresses.push(address);
        }
    }
  
    addStake(from, amount) {
        this.initialize(from);
        this.balance[from] += amount;
    }
  
    getStake(address) {
        this.initialize(address);
        return this.balance[address];
    }
  
    getMax(addresses) {
        let balance = -1;
        let leader = undefined;
        for(const address of addresses) {
            if(this.getStake(address) > balance) {
                leader = address;
                balance = this.getStake(address);
            }
        }
        return leader;
    }
  
    update(transaction) {
        let amount = transaction.output.amount;
        let from = transaction.input.from;
        this.addStake(from, amount);
    }
  }
  

  module.exports = Stake;