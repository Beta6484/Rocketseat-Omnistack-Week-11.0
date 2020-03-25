exports.up = function(knex) { // Responsável pela criação da tabela, o que acontece quando essa migrations é executado
  return knex.schema.createTable('ongs', table => {
    table.string('id').primary(); // Chave primária, vamos criar este id, não pode ser escolhido pela ong
    table.string('name').notNullable(); // notNullable = Não pode ser nulo
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); // Tem 2 como parâmetro já limitando a 2 caracteres
  });
};

exports.down = function(knex) { // Responsável pelo que acontece com erro na criação da tabela
  return knex.schema.dropTable('ongs');
};
