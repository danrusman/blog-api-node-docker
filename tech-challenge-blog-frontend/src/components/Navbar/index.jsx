import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column; /* Empilha a logo e os botões no celular */
    gap: 1rem;
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #00adb5;
  text-decoration: none;
  &:hover { color: #00fff5; }
`;

const MenuLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Se tiver muitos botões, eles quebram para a linha de baixo */
    justify-content: center;
    gap: 0.8rem;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: #00adb5; }
`;

const AdminButton = styled(Link)`
  background-color: #00adb5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover { background-color: #008c95; }
`;

const CreatePostButton = styled(Link)`
  background-color: #38a169;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover { background-color: #2f855a; }
`;

const LogoutButton = styled.button`
  background: transparent;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  &:hover { background: #ff4d4d; color: white; }
`;

function Navbar() {
  const navigate = useNavigate();
  const { isProfessor, logout } = useContext(AuthContext);

  function handleLogout() {
    logout(); // Remove o acesso e altera o estado global instantaneamente
    navigate('/');
  }

  return (
    <Nav>
      <Logo to="/">Blog da FIAP</Logo>
      <MenuLinks>
        <StyledLink to="/">Home</StyledLink>
        
        {isProfessor ? (
          <>
            <CreatePostButton to="/admin/criar">+ Criar Post</CreatePostButton>
            <AdminButton to="/admin">Painel Admin</AdminButton>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </>
        ) : (
          <StyledLink to="/login">Login Professor</StyledLink>
        )}
      </MenuLinks>
    </Nav>
  );
}

export default Navbar;