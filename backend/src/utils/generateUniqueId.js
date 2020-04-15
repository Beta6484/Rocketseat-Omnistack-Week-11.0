const crypto = require('crypto'); // Este pacote já vem no node

module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}