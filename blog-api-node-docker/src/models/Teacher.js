const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
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
  senha: { 
    type: String, 
    required: true,
    select: false
  },  
  departamento: {
    type: String,
    required: true,
    trim: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

TeacherSchema.index({ nome: 'text', departamento: 'text' });

module.exports = mongoose.model('Teacher', TeacherSchema);
