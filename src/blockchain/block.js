const ChainUtil = require('../utils/chain');


class Block {
    constructor(timestamp, lastHash, hash, data, validator, signature) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.validator = validator;
      this.signature = signature;
    }
  
    toString() {
      return `Block - 
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash}
          Hash      : ${this.hash}
          Data      : ${this.data}
          Validator : ${this.validator}
          Signature : ${this.signature}`;
    }

    static genesis() {
        return new this(`genesis time`, "----", "genesis-hash", [])
    }

    static hash(timestamp, lastHash, data) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}`);
    }

    static blockHash(block) {
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }

    static signBlockHash(hash, wallet) {
        return wallet.sign(hash);
    }

    static createBlock(lastBlock, transactions, wallet) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, transactions);

        let validator = wallet.publicKey;

        let signature = Block.signBlockHash(hash, wallet);
    
        return new this(timestamp, lastHash, hash, transactions, validator, signature);
    }

    static verifyBlock(block) {
        return ChainUtil.verifySignature(
          block.validator,
          block.signature,
          Block.hash(block.timestamp, block.lastHash, block.data)
        );
      }

    static verifyLeader(block, leader) {
        return block.validator == leader ? true : false;
    }
}


module.exports = Block;