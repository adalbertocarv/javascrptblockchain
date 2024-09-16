### Documentação do Projeto: **Blockchain para Verificação de Documentos PDF**

---

## Introdução

Este projeto implementa uma **blockchain simples** utilizando **JavaScript (Node.js)**, com o objetivo de demonstrar como uma blockchain pode ser usada para **verificar a integridade de documentos PDF** e **rastrear diferentes versões** de um documento. Ele permite armazenar o **hash** de um documento em um bloco, e à medida que novas versões do documento são criadas, novas entradas são adicionadas na blockchain, garantindo a **imutabilidade** e a **verificação de integridade** do documento.

### Características principais:

- **Imutabilidade**: Uma vez que um documento é registrado na blockchain, ele não pode ser alterado sem invalidar o hash.
- **Prova de trabalho**: Simulação de um algoritmo simples de **proof-of-work**, que ajuda a garantir a validade dos blocos.
- **Versionamento de documentos**: Capacidade de rastrear e registrar várias versões de um documento PDF.
- **Verificação de integridade**: Comparando os hashes armazenados na blockchain com hashes de novos documentos para verificar a autenticidade.

---

## Arquitetura do Projeto

O projeto está organizado de forma modular, com responsabilidades claramente separadas entre as diferentes partes da aplicação. Abaixo está uma visão geral da estrutura de diretórios:

```
blockchain-pdf-verification/
│
├── src/
│   ├── blockchain/
│   │   ├── Blockchain.js        # Classe principal da Blockchain
│   │   └── Block.js             # Classe para representar um Bloco
│   │
│   ├── utils/
│   │   └── cryptoUtils.js       # Funções auxiliares como a criação de hashes
│   │
│   ├── data/
│   │   └── documentManager.js   # Função para gerenciar conteúdo de documentos e adicionar versões
│   │
│   ├── test/
│   │   └── testBlockchain.js    # Arquivo para testar as funcionalidades da Blockchain
│   │
│   └── app.js                   # Ponto de entrada da aplicação
│
├── package.json                 # Arquivo de configuração do Node.js
└── README.md                    # Documentação do projeto
```

---

## Componentes Principais

### 1. **Blockchain.js**
   - Local: `src/blockchain/Blockchain.js`
   - A classe **Blockchain** é responsável por gerenciar a criação de blocos, validação do proof-of-work, armazenamento de hashes de documentos e adição de novos blocos à cadeia.
   
   - Métodos principais:
     - `createBlock(proof, previousHash)`: Cria um novo bloco e adiciona à blockchain.
     - `addData(documentHash, version, documentName)`: Adiciona dados sobre um documento (como o hash e a versão) ao próximo bloco a ser minerado.
     - `getLastBlock()`: Retorna o último bloco da blockchain.
     - `hash(block)`: Gera o hash de um bloco (utiliza o método `toString()` do bloco).
     - `proofOfWork(lastProof)`: Gera um proof-of-work para validar o bloco (simplesmente encontra um proof que faz o hash do proof começar com '0000').
     - `validProof(lastProof, proof)`: Verifica se o proof-of-work é válido.
   
   **Exemplo de Uso**:
   ```javascript
   const blockchain = new Blockchain();
   blockchain.addData(documentHash, "v1", "Contrato");
   blockchain.createBlock(proof, previousHash);
   ```

### 2. **Block.js**
   - Local: `src/blockchain/Block.js`
   - O bloco é uma unidade básica da blockchain. Cada bloco contém:
     - **Index**: O número do bloco.
     - **Timestamp**: O momento de criação do bloco.
     - **Data**: Os dados armazenados no bloco (neste caso, o hash do documento PDF e sua versão).
     - **Proof**: O proof-of-work que valida o bloco.
     - **PreviousHash**: O hash do bloco anterior, que garante a continuidade e a imutabilidade da cadeia.

   **Exemplo de Uso**:
   ```javascript
   const block = new Block(index, timestamp, data, proof, previousHash);
   ```

### 3. **cryptoUtils.js**
   - Local: `src/utils/cryptoUtils.js`
   - Este arquivo contém funções auxiliares para gerar o hash de um documento.
   - Utiliza o **SHA-256**, que é amplamente usado em blockchains para garantir a integridade dos dados.

   **Funções principais**:
   - `hashDocument(documentContent)`: Gera o hash SHA-256 do conteúdo de um documento.

   **Exemplo de Uso**:
   ```javascript
   const { hashDocument } = require('./utils/cryptoUtils');
   const documentHash = hashDocument(documentContent);
   ```

### 4. **documentManager.js**
   - Local: `src/data/documentManager.js`
   - Este arquivo gerencia a criação de diferentes versões de documentos e gera o hash de cada versão.
   - Ele separa a lógica de manipulação de documentos do restante do código da blockchain.

   **Funções principais**:
   - `createDocumentVersion(content, version)`: Gera uma versão de um documento com seu hash.

   **Exemplo de Uso**:
   ```javascript
   const { createDocumentVersion } = require('./data/documentManager');
   const documentVersion = createDocumentVersion(documentContent, "v1");
   ```

### 5. **testBlockchain.js**
   - Local: `src/test/testBlockchain.js`
   - Um arquivo de teste para verificar a funcionalidade da blockchain.
   - Ele cria uma blockchain, adiciona dados e gera blocos, verificando se tudo está funcionando como esperado.

---

## Como Funciona

### 1. **Prova de Trabalho**
   A blockchain implementada neste projeto utiliza um **proof-of-work** simplificado. A função `proofOfWork()` busca um número (`proof`) tal que o hash resultante de concatenar o proof com o proof anterior comece com "0000". Isso simula o processo de mineração.

### 2. **Verificação de Integridade**
   Para garantir a integridade dos documentos, o hash de cada versão do documento PDF é armazenado em um bloco da blockchain. Quando alguém deseja verificar a integridade de um documento, pode recalcular o hash do documento e compará-lo com o hash armazenado na blockchain.

### 3. **Criação de Blocos**
   Quando novos dados (como versões de documentos) são adicionados, eles são temporariamente armazenados. Um novo bloco é criado usando o proof-of-work, e esse bloco é adicionado à blockchain junto com o hash do bloco anterior.

---

## Como Executar o Projeto

### 1. Pré-requisitos:

Antes de rodar o projeto, você precisará ter:
- **Node.js** instalado no seu ambiente. O Node.js inclui o gerenciador de pacotes **npm**.
  
   - [Baixar Node.js](https://nodejs.org/)

### 2. Clonando o repositório

Você pode clonar o repositório deste projeto para o seu computador local:

```bash
git clone https://github.com/seu-repositorio/blockchain-pdf-verification.git
cd blockchain-pdf-verification
```

### 3. Instalando as dependências

Execute o comando abaixo para instalar as dependências do projeto.

```bash
npm install
```

### 4. Executando o projeto

Depois de instalar as dependências, você pode rodar o projeto com o seguinte comando:

```bash
npm start
```

Isso executará o arquivo `app.js`, que:
- Instancia uma nova blockchain.
- Adiciona diferentes versões de um documento PDF.
- Cria blocos e os adiciona à blockchain.
- Mostra o estado da blockchain no console.

### 5. Executando os testes

Se você quiser rodar os testes para verificar se tudo está funcionando corretamente, use o seguinte comando:

```bash
npm test
```

O teste simulará a criação de uma blockchain e verificará se os hashes e blocos estão funcionando conforme o esperado.

---

## Exemplos de Uso

### Adicionando versões de documentos à blockchain

Aqui está um exemplo de como você pode adicionar diferentes versões de um documento PDF à blockchain e criar novos blocos:

```javascript
const Blockchain = require('./blockchain/Blockchain');
const { createDocumentVersion } = require('./data/documentManager');

const blockchain = new Blockchain();

// Primeira versão do documento
const docV1 = "Conteúdo do PDF versão 1";
const version1 = createDocumentVersion(docV1, "v1");
blockchain.addData(version1.hash, version1.version, "Contrato");

// Segunda versão do documento
const docV2 = "Conteúdo do PDF versão 2";
const version2 = createDocumentVersion(docV2, "v2");
blockchain.addData(version2.hash, version2.version, "Contrato");

// Criar um novo bloco
const lastBlock = blockchain.getLastBlock();
const proof = blockchain.proofOfWork(lastBlock.proof);
const previousHash = blockchain.hash(lastBlock);
blockchain.createBlock(proof, previousHash);

// Exibir a blockchain
console.log(JSON.stringify(blockchain.chain, null, 4));
```

### Verificando a integridade de um documento

Se você deseja verificar se um documento está intacto (sem alterações), pode comparar o hash do documento com o hash armazenado na blockchain:

```javascript
const documentContentToCheck = "Conteúdo do

 PDF versão 2";
const hashToCheck = hashDocument(documentContentToCheck);

// Buscando o hash armazenado na blockchain
const blockToCheck = blockchain.chain[1];  // Supondo que o documento está no segundo bloco
const storedHash = blockToCheck.data[1].documentHash;  // Acessa o hash da versão 2

if (hashToCheck === storedHash) {
    console.log("O documento é autêntico e sua integridade está preservada.");
} else {
    console.log("O documento foi alterado ou está corrompido.");
}
```

---

## Conclusão

Este projeto oferece uma implementação simples de blockchain que pode ser usada para verificar a integridade e o versionamento de documentos PDF. Embora seja uma blockchain local, ele serve como base para aprender os conceitos fundamentais e pode ser expandido para funcionar em redes maiores, como **Ethereum**, usando **smart contracts**.