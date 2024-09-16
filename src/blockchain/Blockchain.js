const crypto = require('crypto');  // Importando o pacote crypto
const Block = require('./Block');  // Importando a classe Block

class Blockchain {
    constructor() {
        this.chain = [];
        this.currentData = [];
        this.createBlock(100, '1');  // Criando o bloco gênesis
    }

    // Método para criar um novo bloco
    createBlock(proof, previousHash) {
        const block = new Block(
            this.chain.length + 1,    // Índice do bloco
            Date.now(),               // Timestamp do bloco
            this.currentData,          // Dados (documentos)
            proof,                     // Prova de trabalho
            previousHash               // Hash do bloco anterior
        );

        this.currentData = [];        // Limpa os dados temporários após criar o bloco
        this.chain.push(block);       // Adiciona o novo bloco à blockchain
        return block;
    }

    // Método para adicionar dados (hashes de documentos) ao bloco atual
    addData(documentHash, version, documentName) {
        this.currentData.push({
            documentName: documentName,
            documentHash: documentHash,
            version: version
        });
        return true;
    }

    // Método para obter o último bloco da cadeia
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Método para gerar o hash de um bloco
    hash(block) {
        const blockString = block.toString();  // Usa o método toString da classe Block
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    // Método para prova de trabalho (simplificado)
    proofOfWork(lastProof) {
        let proof = 0;
        while (!this.validProof(lastProof, proof)) {
            proof += 1;
        }
        return proof;
    }

    // Valida se o proof atual é válido (simples: se o hash começa com '0000')
    validProof(lastProof, proof) {
        const guess = `${lastProof}${proof}`;
        const guessHash = crypto.createHash('sha256').update(guess).digest('hex');
        return guessHash.substring(0, 4) === '0000';
    }
}

module.exports = Blockchain;
