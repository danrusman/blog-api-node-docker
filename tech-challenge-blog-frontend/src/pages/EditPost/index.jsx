import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'; // Adicionado keyframes para manter o padrão visual
import api from '../../services/api';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  /* Aplica a assinatura de animação que combinamos para as telas do app */
  animation: ${fadeInUp} 0.5s ease-out forwards;
  will-change: transform, opacity;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #00adb5;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    border-color: #00adb5;
  }
`;

// Container flexível para alinhar os botões lado a lado
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end; /* Alinha os botões à direita */
  gap: 1rem; /* Espaçamento entre os botões */
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column-reverse; /* Em telas pequenas, empilha os botões colocando o Cancelar embaixo */
  }
`;

const Button = styled.button`
  background: #00adb5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #008c95;
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

// Novo estilo para o botão Cancelar seguindo a identidade visual limpa do projeto
const CancelButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #cbd5e0;
  }
`;

// Correção sutil no prop error para evitar avisos no console do React (usando prefixo $)
const Message = styled.p`
  color: ${props => props.$error ? '#ff4d4d' : '#38a169'};
  text-align: center;
  font-weight: 500;
`;

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await api.get(`/posts/${id}`);
        const { titulo, conteudo, autor } = response.data;
        
        setTitulo(titulo);
        setConteudo(conteudo);
        setAutor(autor);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar post:", error);
        setMensagem("Erro ao carregar dados do post.");
      }
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/posts/${id}`, {
        titulo,
        conteudo,
        autor
      });
      
      setMensagem("Postagem atualizada com sucesso!");
      
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      setMensagem("Erro ao salvar alterações.");
    }
  }

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '3rem' }}>Carregando dados...</h3>;

  return (
    <Container>
      <h2 style={{ marginBottom: '1.5rem', color: '#1a1a1a' }}>Editar post</h2>
      {mensagem && <Message $error={mensagem.includes("Erro")}>{mensagem}</Message>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Título</Label>
          <Input 
            value={titulo} 
            onChange={e => setTitulo(e.target.value)} 
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Autor</Label>
          <Input 
            value={autor} 
            onChange={e => setAutor(e.target.value)} 
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Conteúdo</Label>
          <TextArea 
            value={conteudo} 
            onChange={e => setConteudo(e.target.value)} 
            required
          />
        </FormGroup>

        {/* Grupo de botões organizados lado a lado */}
        <ButtonGroup>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            Cancelar
          </CancelButton>
          <Button type="submit">Salvar Alterações</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default EditPost;