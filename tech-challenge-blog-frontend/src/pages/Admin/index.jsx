import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const modalSurgir = keyframes`
  from { opacity: 0; transform: scale(0.9) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  background: transparent; /* Remova o cinza escuro daqui */
  padding: 2rem;
  border-radius: 8px;
  animation: ${fadeInUp} 0.5s ease-out forwards;
  will-change: transform, opacity;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a1a1a;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
  margin-top: 2rem;
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0.5rem;
  gap: 1.5rem;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const PostTitleLink = styled(Link)`
  font-weight: 500;
  color: #1a1a1a;
  text-decoration: none;
  flex: 1;
  word-break: break-word;

  &:hover { color: #00adb5; }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
`;

const EditLink = styled(Link)`
  color: #00adb5;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: #008c95; }
`;

const DeleteButton = styled.button`
  color: #ff4d4d;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  padding: 0;
  transition: color 0.2s;
  &:hover { color: #e53e3e; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 450px;
  width: 90%; /* Deixa uma margem de segurança para telas pequenas e dispositivos móveis */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25); /* Sombra projetada mais realista */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${modalSurgir} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  margin: auto; 
`;

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  color: #1a1a1a;
`;

const ModalText = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #cbd5e0; }
`;

const ConfirmDeleteButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #e53e3e; }
`;
function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [postSelecionado, setPostSelecionado] = useState(null);

  async function carregarPosts() {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao carregar posts no admin:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  // Abre o modal e guarda temporariamente o post que o usuário quer deletar
  function abrirModalConfirmacao(post) {
    setPostSelecionado(post);
    setModalAberto(true);
  }

  // Executa a exclusão de fato após o usuário confirmar no modal
  async function executarExclusao() {
    if (!postSelecionado) return;

    const id = postSelecionado._id || postSelecionado.id;

    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => (post._id || post.id) !== id));
      setModalAberto(false); // Fecha o modal
      setPostSelecionado(null);
    } catch (error) {
      console.error("Erro ao deletar postagem:", error);
      alert("Não foi possível excluir a postagem. Tente novamente.");
    }
  }

  if (loading) return <Message>Carregando gerenciador...</Message>;
  
  return (
    <> {/* Fragment do React abrindo aqui */}
      <AdminContainer>
        <HeaderSection>
          <Title>Painel Administrativo</Title>
        </HeaderSection>

        {posts.length === 0 ? (
          <Message>Nenhuma postagem cadastrada para gerenciar.</Message>
        ) : (
          <div>
            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
              Há {posts.length} postagem(ns) publicada(s).
            </p>
            
            {posts.map(post => {
              const postId = post._id || post.id;
              return (
                <PostRow key={postId}>
                  <PostTitleLink to={`/posts/${postId}`}>
                    {post.titulo}
                  </PostTitleLink>
                  
                  <ActionGroup>
                    <EditLink to={`/admin/editar/${postId}`}>Editar</EditLink>
                    <DeleteButton onClick={() => abrirModalConfirmacao(post)}>
                      Excluir
                    </DeleteButton>
                  </ActionGroup>
                </PostRow>
              );
            })}
          </div>
        )}
      </AdminContainer>

      {modalAberto && postSelecionado && (
        <ModalOverlay onClick={() => setModalAberto(false)}>
          {/* Evita que o clique dentro do modal feche ele sem querer */}
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Excluir Postagem</ModalTitle>
            <ModalText>
              Tem certeza que deseja excluir permanentemente a postagem <strong>"{postSelecionado.titulo}"</strong>? Esta ação não poderá ser desfeita.
            </ModalText>
            <ModalButtonGroup>
              <CancelButton onClick={() => setModalAberto(false)}>
                Cancelar
              </CancelButton>
              <ConfirmDeleteButton onClick={executarExclusao}>
                Sim, excluir
              </ConfirmDeleteButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </> 
  );
}

export default Admin;