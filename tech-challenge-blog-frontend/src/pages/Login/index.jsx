import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const rodar = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
`;

const FormCard = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* Se $saiu for true, roda fadeOut. Se não, roda fadeInUp ao carregar */
  animation: ${props => props.$saiu ? fadeOut : fadeInUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #718096;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #00adb5;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  background-color: #00adb5;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 45px;

  &:hover:not(:disabled) {
    background-color: #008c95;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${rodar} 0.8s linear infinite;
`;

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    setTimeout(() => {
      if (email === 'professor@fiap.com.br' && senha === 'admin') {
        login();
        setSucesso(true);
        setTimeout(() => {
          navigate('/');
        }, 500);

      } else {
        setErro('E-mail ou senha incorretos. Tente novamente.');
        setCarregando(false);
      }
    }, 800);
  }

  return (
    <LoginContainer>
      <FormCard onSubmit={handleLogin} $saiu={sucesso}>
        <div>
          <Title>Login do Professor</Title>
          <Subtitle>Acesse para gerenciar as postagens do blog</Subtitle>
        </div>

        <FormGroup>
          <Label htmlFor="email">E-mail Institucional</Label>
          <Input 
            id="email"
            type="email" 
            placeholder="professor@fiap.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={carregando}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="senha">Senha de Acesso</Label>
          <Input 
            id="senha"
            type="password" 
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={carregando}
          />
        </FormGroup>

        {erro && <ErrorMessage>{erro}</ErrorMessage>}

        <SubmitButton type="submit" disabled={carregando}>
          {carregando ? <Spinner /> : "Entrar no Painel"}
        </SubmitButton>
      </FormCard>
    </LoginContainer>
  );
}

export default Login;