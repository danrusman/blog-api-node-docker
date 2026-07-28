const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  matricula: {
    type: String,
    required: true,
    unique: true, // Garante que não existam duas matrículas iguais
    trim: true
  },
  senha: { 
    type: String, 
    required: true,
    select: false // Oculta a senha por padrão em consultas GET
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

// Índice para buscas textuais por nome ou matrícula
StudentSchema.index({ nome: 'text', matricula: 'text' });

module.exports = mongoose.model('Student', StudentSchema);
