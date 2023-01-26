const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const previousBlockHash = '000';

const nonce = 21156;

const currentBlockData = [
    {
        amount: 10,
        sender: 'tom',
        recipient: 'john',
    },
    {
        amount: 100,
        sender: 'tom',
        recipient: 'jenny',
    }
]




//console.log(bitcoin.proofOfWork(001,currentBlockData));

console.log(bitcoin.hashBlock(001,currentBlockData,nonce));

//console.log(bitcoin.proofOfWork(previousBlockHash,currentBlockData))