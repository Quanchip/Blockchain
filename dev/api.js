const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const blockchain  = require('./blockchain');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const uuid = require('uuid');
const nodeAdress = uuid.v1();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    res.json({note:`Transaction will be added in block ${blockIndex}` });
});

app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: bitcoin.pendingTransaction,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData); 
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
    const newBlock  = bitcoin.createNewblock(nonce, previousBlockHash, blockHash);
    res.json({note:"New block mined successfully",
              block: newBlock});
    bitcoin.createNewTransaction(12.5, "00", nodeAdress);
});

app.listen(6969, function(){
    console.log('listening in port 6969...');
});