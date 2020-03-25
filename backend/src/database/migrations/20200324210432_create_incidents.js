exports.up = function(knex) {
  return knex.schema.createTable('incidents', table => {
    table.increments(); // Id numérico de auto incremento;
    table.string('title').notNullable(); // notNullable = Não pode ser nulo
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.string('ong_id').notNullable(); // Relacionamento
    table.foreign('ong_id').references('id').inTable('ongs'); // Chave extrangeira, o ong_id deve ser correspondente a um id na tabela ongs
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
