const express = require('express');
const connectDatabase = require('./database/db');
const routes = require('./routes');
require('dotenv').config();

const app = express();

connectDatabase();

app.use((req, res, next) => {
  // Permite que qualquer origem (inclusive o seu React na porta 5173) acesse a API
  res.header("Access-Control-Allow-Origin", "*");
  // Define quais métodos HTTP são aceitos
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Define quais cabeçalhos são permitidos
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  next();
});

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('API - Professores - online');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
