const Blockchain = require('../blockchain/blockchain');
const express = require('express');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server.js');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

app.use(bodyParser.json());

const blockchain = new Blockchain();

const p2pserver = new P2pServer(blockchain);

app.get('/block', (req, res) => {
    res.json(blockchain.chain);
})

app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    p2pserver.syncChain();
});

p2pserver.listen();

// app server configurations
app.listen(HTTP_PORT,()=>{
    console.log(`listening on port ${HTTP_PORT}`);
})