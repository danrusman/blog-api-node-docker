import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

// Esse "interceptor" roda automaticamente antes de QUALQUER requisição sair do Front para o Back
api.interceptors.request.use((config) => {
  // Busca o token de autenticação que salvaremos no navegador quando o professor logar
  const token = localStorage.getItem('token');
  
  // Se o token existir, injeta ele automaticamente no cabeçalho (Header) da requisição
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;