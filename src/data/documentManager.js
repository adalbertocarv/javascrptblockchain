const { hashDocument } = require('../utils/cryptoUtils');

function createDocumentVersion(content, version) {
    const documentHash = hashDocument(content);
    return {
        version: version,
        hash: documentHash
    };
}

module.exports = { createDocumentVersion };
