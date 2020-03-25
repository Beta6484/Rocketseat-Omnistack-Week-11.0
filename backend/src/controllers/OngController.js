const connection = require('../database/connection');
const crypto = require('crypto'); // Este pacote já vem no node

module.exports = {
  async index(request, response) { // Index geralmente é o nome dado ao método que lista todos os itens
    const ongs = await connection('ongs').select('*'); // Vai retornar um array
    return response.json(ongs);
  },

  async create(request, response) {
    // const data = request.body; // Vem o objeto inteiro
    const { name, email, whatsapp, city, uf } = request.body; // Desestruturação, garante que nada de estranho será recebido;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('ongs').insert({ id, name, email, whatsapp, city, uf }) // o await vai fazer aguardar este código finalizar
    return response.json({ id }); // Devolvendo o id que funcionará como identificação que a ong irá utilizar quando se conectar
  }
};