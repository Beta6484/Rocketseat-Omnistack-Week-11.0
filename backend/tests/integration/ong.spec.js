const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); // Zerando o banco de dados antes de começar o teste
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy(); //
  });

  it('Should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "TABAXANA",
        email: "contato@tabaxana.com",
        whatsapp: "21993718203",
        city: "São Tomé",
        uf: "MG"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});