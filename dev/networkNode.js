const port  = process.argv[2];
const currentNodeUrl = process.argv[3];

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
// (/blockchain endpoint): create a genesis block
app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});
//(/transaction endpoint): 
app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    res.json({note:`Transaction will be added in block ${blockIndex}` });
});
// (/mine endpoint): create or mine a new block
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
app.post('/register-and-broadcast-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl;

});
app.post('/register-node',function(req,res){
    


});
app.post('/register-nodes-bulk',function(req,res){
    


});
app.listen(port, function(){
    console.log(`listening in port ${port} ...`);
});