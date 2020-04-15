const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const { errors } = require('celebrate');

app.use(express.json()); // Precisa vir antes da rota para converter os dados corretamente
app.use(cors());
// app.use(cors({
//     origin: 'http://meuapp.com.br'
// })); // Aqui vamos determinar qual endereço pode acessar a api
app.use(routes);
app.use(errors());
// app.listen(3333); eliminando daqui pois as coisas foram separadas no arquivo de testes.
module.exports = app;