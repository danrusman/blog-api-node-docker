import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../../services/api';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackLink = styled(Link)`
  color: #00adb5;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1.5rem;
  &:hover { text-decoration: underline; }
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
`;

const PostContent = styled.div`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #2d3748;
  white-space: pre-wrap;
  animation: ${fadeInUp} 0.5s ease-out forwards;
`;

const CommentsSection = styled.div`
  margin-top: 4rem;
  border-top: 2px solid #e2e8f0;
  padding-top: 2rem;
  animation: ${fadeInUp} 0.4s ease-out forwards;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateX(4px); /* Desloca sutilmente para o lado */
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const CommentInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  &:focus { border-color: #00adb5; }
`;

const CommentTextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  outline: none;
  &:focus { border-color: #00adb5; }
`;

const CommentButton = styled.button`
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;
  &:hover { background-color: #008c95; }
`;

const CommentCard = styled.div`
  background: #f7fafc;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #00adb5;
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  font-size: 0.95rem;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const CommentText = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #a0aec0;
  display: block;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: #718096;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [textoComentario, setTextoComentario] = useState('');

  // Carrega o post e seus comentários do banco
  async function carregarPost() {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Erro ao carregar detalhes do post:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPost();
  }, [id]);

  // Envia o novo comentário para o Back-end
  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!nome || !textoComentario) return;

    try {
      await api.post(`/posts/${id}/comentarios`, {
        autor: nome,
        conteudo: textoComentario
      });

      setNome('');
      setTextoComentario('');
      carregarPost();
      
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      alert("Não foi possível enviar o comentário no momento.");
    }
  }

  if (loading) return <Message>Carregando postagem...</Message>;
  if (!post) return <Message>Postagem não encontrada.</Message>;

  return (
    <DetailContainer>
      <BackLink to="/">← Voltar para a Home</BackLink>
      
      <PostTitle>{post.titulo}</PostTitle>
      <MetaInfo>Por <strong>{post.autor}</strong> em {new Date(post.createdAt || post.data || post.dataCriacao).toLocaleDateString('pt-BR')}</MetaInfo>
      <PostContent>{post.conteudo}</PostContent>

      <CommentsSection>
        <SectionTitle>Comentários ({post.comentarios ? post.comentarios.length : 0})</SectionTitle>
        {/* Formulário para criar novo comentário */}
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput 
            type="text" 
            placeholder="Seu nome ou apelido" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <CommentTextArea 
            placeholder="Escreva seu comentário sobre o tema..." 
            value={textoComentario}
            onChange={(e) => setTextoComentario(e.target.value)}
            required
          />
          <CommentButton type="submit">Enviar Comentário</CommentButton>
        </CommentForm>

        {/* Listagem dos comentários vindos do Banco */}
        {post.comentarios && post.comentarios.length > 0 ? (
          post.comentarios.map((comentario, index) => (
            <CommentCard key={comentario._id || index}>
              <CommentAuthor>{comentario.autor}</CommentAuthor>
              <CommentDate>{new Date(comentario.createdAt || comentario.data || comentario.dataCriacao || Date.now()).toLocaleDateString('pt-BR')}</CommentDate>              
              <CommentText>{comentario.conteudo}</CommentText>
            </CommentCard>
          ))
        ) : (
          <p style={{ color: '#a0aec0', italic: 'true' }}>Seja o primeiro a comentar nesta postagem!</p>
        )}
      </CommentsSection>
    </DetailContainer>
  );
}

export default PostDetail;