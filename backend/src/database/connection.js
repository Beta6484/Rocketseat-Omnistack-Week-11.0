const knex = require('knex');
const configuration = require('../../knexfile');
const connection = knex(configuration.development); // Conexão de desenvolvimento

module.exports = connection;