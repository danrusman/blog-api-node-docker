const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    // MONGO_URI vem do nosso docker-compose
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb');
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
