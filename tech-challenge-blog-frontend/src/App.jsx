import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const EditPost = lazy(() => import('./pages/EditPost'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <Navbar />

        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Suspense fallback={
            <h3 style={{ textAlign: 'center', marginTop: '3rem', color: '#00adb5', fontFamily: 'sans-serif' }}>
              Carregando página...
            </h3>
          }>
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas Privadas */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/criar" element={<CreatePost />} />
              <Route path="/admin/editar/:id" element={<EditPost />} />

              {/* Rota 404 */}
              <Route path="*" element={<h2>Página não encontrada (404)</h2>} />
            </Routes>
          </Suspense>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;