const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  conteudo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },

  comentarios: [
    {
      autor: {
        type: String,
        required: true
      },
      conteudo: {
        type: String,
        required: true
      },
      dataCriacao: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

PostSchema.index({ titulo: 'text', conteudo: 'text' });

module.exports = mongoose.model('Post', PostSchema);