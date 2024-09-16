class Block {
    constructor(index, timestamp, data, proof, previousHash) {
        this.index = index;           // Índice do bloco
        this.timestamp = timestamp;   // Momento de criação do bloco
        this.data = data;             // Dados (hashes de documentos, metadados, etc.)
        this.proof = proof;           // Prova de trabalho
        this.previousHash = previousHash;  // Hash do bloco anterior
    }

    // Método para retornar uma representação do bloco em formato string para ser hasheada
    toString() {
        return JSON.stringify(this);
    }
}

module.exports = Block;
