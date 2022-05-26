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

const p2pserver = new P2pServer(blockchain, transactionPool);


app.get('/block', (req, res) => {
    res.json(blockchain.chain);
})

app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    p2pserver.syncChain();
});

app.get('/transactions', (req, res) => {
    res.json(transactionPool.transactions);
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