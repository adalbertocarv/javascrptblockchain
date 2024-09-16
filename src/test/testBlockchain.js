const Blockchain = require('../blockchain/Blockchain');
const { createDocumentVersion } = require('../data/documentManager');

const blockchain = new Blockchain();

const docV1 = "Conteúdo do PDF versão 1";
const version1 = createDocumentVersion(docV1, "v1");
blockchain.addData(version1.hash, version1.version, "Contrato");

const docV2 = "Conteúdo do PDF versão 2";
const version2 = createDocumentVersion(docV2, "v2");
blockchain.addData(version2.hash, version2.version, "Contrato");

const lastBlock = blockchain.getLastBlock();
const proof = blockchain.proofOfWork(lastBlock.proof);
const previousHash = blockchain.hash(lastBlock);
blockchain.createBlock(proof, previousHash);

console.log(JSON.stringify(blockchain.chain, null, 4));
