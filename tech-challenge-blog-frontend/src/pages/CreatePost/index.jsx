import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../../services/api';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: ${fadeInUp} 0.5s ease-out forwards;
  will-change: transform, opacity;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const Message = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${props => props.$error ? '#e53e3e' : '#38a169'};
  margin-top: 1rem;
`;

function CreatePost() {
  const navigate = useNavigate(); // Para redirecionar o usuário após criar o post
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', erro: false });

  // Função disparada ao clicar no botão de enviar
  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !autor || !conteudo) {
      setMensagem({ texto: 'Por favor, preencha todos os campos.', erro: true });
      return;
    }

    try {
      setEnviando(true);
      setMensagem({ texto: '', erro: false });

      await api.post('/posts', {
        titulo,
        autor,
        conteudo
      });

      setMensagem({ texto: 'Postagem criada com sucesso! Redirecionando...', erro: false });
      setTitulo('');
      setAutor('');
      setConteudo('');

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      console.error("Erro ao criar postagem:", err);
      setMensagem({ texto: 'Erro ao enviar a postagem. Tente novamente.', erro: true });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <FormContainer>
      <FormTitle>Novo post</FormTitle>
      
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="titulo">Título do post</Label>
          <Input 
            id="titulo"
            type="text" 
            placeholder="Ex: Introdução ao React"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="autor">Nome do Docente (Autor)</Label>
          <Input 
            id="autor"
            type="text" 
            placeholder="Ex: Prof. Ana Silva"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="conteudo">Conteúdo do post</Label>
          <TextArea 
            id="conteudo"
            placeholder="Escreva aqui o conteúdo completo do seu post..."
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Publicar Post'}
        </Button>
      </StyledForm>

      {mensagem.texto && (
        <Message $error={mensagem.erro}>{mensagem.texto}</Message>
      )}
    </FormContainer>
  );
}

export default CreatePost;