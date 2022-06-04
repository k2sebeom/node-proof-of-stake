const Blockchain = require('../blockchain/blockchain');
const express = require('express');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server.js');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

app.use(bodyParser.json());

const blockchain = new Blockchain();

const wallet = new Wallet(Date.now().toString());

const transactionPool = new TransactionPool();

const p2pserver = new P2pServer(blockchain, transactionPool, wallet);


app.get('/block', (req, res) => {
    res.json(blockchain.chain);
})

app.get('/transaction', (req, res) => {
    res.json(transactionPool.transactions);
});

app.get("/public-key", (req,res) => {
    res.json({ publicKey: wallet.publicKey });
});

app.get("/validators", (req, res) => {
    res.json({ validators: blockchain.validators });
})

app.get("/balance", (req, res) => {
  res.json({ balance: blockchain.getBalance(wallet.publicKey) });
});

app.post('/transaction', (req, res) => {
    const { to, amount, type } = req.body;
    const tx = wallet.createTransaction(to, amount, type, blockchain, transactionPool);
    p2pserver.broadcastTransaction(tx);
    res.redirect('/transactions');
})


p2pserver.listen();

// app server configurations
app.listen(HTTP_PORT,()=>{
    console.log(`listening on port ${HTTP_PORT}`);
})