const Post = require('../models/Post');

module.exports = {
  // GET /posts - Lista todos os posts
  async index(req, res) {
    try {
      const posts = await Post.find().sort({ dataCriacao: -1 });
      return res.json(posts);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar posts' });
    }
  },

  // POST /posts - Criação de Postagens
  async store(req, res) {
    const { titulo, conteudo, autor } = req.body;

    if (!titulo || !conteudo || !autor) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    try {
      const newPost = await Post.create({ titulo, conteudo, autor });
      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar postagem' });
    }
  },

  // GET /posts/:id - Leitura de Post específico
  async show(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post não encontrado' });
      return res.json(post);
    } catch (err) {
      return res.status(400).json({ error: 'ID inválido ou erro na busca' });
    }
  },

  // PUT /posts/:id - Edição de Postagens
  async update(req, res) {
    const { titulo, conteudo, autor } = req.body;
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id, 
        { titulo, conteudo, autor }, 
        { new: true } // Retorna o post já atualizado
      );
      if (!post) return res.status(404).json({ error: 'Post não encontrado para editar' });
      return res.json(post);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar postagem' });
    }
  },

  // DELETE /posts/:id - Exclusão de Postagens
  async destroy(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post não encontrado para excluir' });
      return res.status(204).send(); // Sucesso sem conteúdo de retorno
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao excluir postagem' });
    }
  },

  // GET /posts/search - Busca de Posts
  async search(req, res) {
    const { q } = req.query; 
    try {
      const posts = await Post.find({
        $or: [
          { titulo: { $regex: q, $options: 'i' } },   
          { conteudo: { $regex: q, $options: 'i' } }
        ]
      });
      return res.json(posts);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao realizar busca' });
    }
  },

  async storeComment(req, res) {
    try {
      const { id } = req.params;
      const { autor, conteudo } = req.body;

      if (!autor || !conteudo) {
        return res.status(400).json({ error: 'Nome e conteúdo do comentário são obrigatórios' });
      }

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado para comentar' });
      }

      const novoComentario = {
        autor,
        conteudo,
        dataCriacao: new Date()
      };

      // Adiciona o comentário na lista interna do post
      post.comentarios.push(novoComentario);
      
      // Salva a alteração no MongoDB
      await post.save();

      // Retorna o post completo já atualizado com o novo comentário
      return res.status(201).json(post);
    } catch (err) {
      console.error("Erro ao salvar comentário:", err);
      return res.status(500).json({ error: 'Erro interno ao salvar comentário' });
    }
  }
};