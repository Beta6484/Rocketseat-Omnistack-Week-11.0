const connection = require('../database/connection');

module.exports = {
  async index(request, response) { // Index geralmente é o nome dado ao método que lista todos os itens
    const { page = 1 } = request.query;
    const [count] = await connection('incidents').count(); // Colocando colchetes em volta para pegar apenas a primeira posição do array
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Para retornar também os dados da ong ao qual este caso está atribuído
      .limit(5)
      .offset((page - 1) * 5) // Mantem a primeira página de resultados depois vai retornando incrementando de 5 em 5
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]); // Vai retornar um array

    response.header('X-Total-Count', count['count(*)']);
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    const [id] = await connection('incidents').insert({ title, description, value, ong_id }) // primeira chave do array será armazenado neste id
    return response.json({ id }); // Devolvendo o id que funcionará como identificação que a ong irá utilizar quando se conectar
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation nor permitted.' });
    }

    await connection('incidents').where('id', id).delete();
    return response.status(204).send(); // 204 é uma resposta que deu sucesso porém não tem conteúdo. O send é para enviar a resposta sem corpo, vazia.
  }
};