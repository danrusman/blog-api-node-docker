const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Post = require('../src/models/Post');

describe('Testes da API de Blog', () => {
  
  beforeAll(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Deve criar uma nova postagem (POST /posts)', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        titulo: 'Aula de Node.js',
        conteudo: 'Hoje vamos aprender Docker.',
        autor: 'Prof. Fulano'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.titulo).toBe('Aula de Node.js');
  });

  it('Deve listar todas as postagens (GET /posts)', async () => {
    const response = await request(app).get('/posts');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  // Teste de Busca
  it('Deve buscar postagens por palavra-chave (GET /posts/search)', async () => {
    const response = await request(app)
      .get('/posts/search')
      .query({ q: 'Docker' }); // Busca o post que criamos no teste anterior

    expect(response.status).toBe(200);
    expect(response.body[0].titulo).toContain('Node.js');
  });

  // Teste de Edição
  it('Deve editar uma postagem existente (PUT /posts/:id)', async () => {
    // Primeiro, cria um post para editar
    const post = await Post.create({
      titulo: 'Aula Antiga',
      conteudo: 'Conteúdo velho',
      autor: 'Prof. Antigo'
    });

    const response = await request(app)
      .put(`/posts/${post._id}`)
      .send({ titulo: 'Aula Atualizada' });

    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('Aula Atualizada');
  });

  // Teste de Exclusão
  it('Deve excluir uma postagem (DELETE /posts/:id)', async () => {
    const post = await Post.create({
      titulo: 'Post para Deletar',
      conteudo: '...',
      autor: 'Autor'
    });

    const response = await request(app).delete(`/posts/${post._id}`);
    
    expect(response.status).toBe(204);

    // Verifica se sumiu mesmo do banco
    const busca = await Post.findById(post._id);
    expect(busca).toBeNull();
  });
});
