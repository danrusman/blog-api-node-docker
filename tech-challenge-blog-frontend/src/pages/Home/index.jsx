import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a1a1a;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00adb5;
    max-width: 450px;
    box-shadow: 0 4px 12px rgba(0, 173, 181, 0.1);
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PostCard = styled(Link)`
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Garante alinhamento harmônico do conteúdo */
  text-decoration: none;
  color: #212529;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  animation: ${fadeInUp} 0.4s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    
    /* CORRIGIDO: Mudando para h2, que é a tag real do seu PostTitle */
    h2 {
      color: #00adb5;
    }
  }
`;

const PostTitle = styled.h2`
  font-size: 1.3rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease-in-out;
`;

const PostAuthor = styled.span`
  color: #4a5568; 
  font-size: 0.9rem;
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
`;

const PostDescription = styled.p`
  color: #2d3748; 
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
  margin-top: 2rem;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    post.conteudo?.toLowerCase().includes(search.toLowerCase()) ||
    post.autor?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Message>Carregando postagens...</Message>;
  if (error) return <Message>Ops! Houve um erro ao carregar os posts. Verifique se o seu Back-End está rodando.</Message>;

  return (
    <HomeContainer>
      <HeaderSection>
        <Title>Últimas Postagens</Title>
        <SearchInput 
          type="text" 
          placeholder="Pesquisar por título, autor ou conteúdo..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </HeaderSection>

      {filteredPosts.length === 0 ? (
        <Message>Nenhum post encontrado para a sua busca.</Message>
      ) : (
        <PostsGrid>
          {filteredPosts.map((post) => {
            const postId = post._id || post.id;
            
            return (
              <PostCard to={`/posts/${postId}`} key={`${postId}-${filteredPosts.length}`}>
                <div>
                  <PostTitle>{post.titulo}</PostTitle>
                  <PostAuthor>Por: {post.autor}</PostAuthor>
                  <PostDescription>
                    {post.conteudo?.length > 120 
                      ? `${post.conteudo.substring(0, 120)}...` 
                      : post.conteudo}
                  </PostDescription>
                </div>
              </PostCard>
            );
          })}
        </PostsGrid>
      )}
    </HomeContainer>
  );
}

export default Home;