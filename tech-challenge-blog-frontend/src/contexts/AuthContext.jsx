import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isProfessor, setIsProfessor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca o estado inicial do localStorage para não deslogar ao dar F5
    const logged = localStorage.getItem('isProfessor') === 'true';
    setIsProfessor(logged);
    setLoading(false);
  }, []);

  function login() {
    localStorage.setItem('isProfessor', 'true');
    setIsProfessor(true);
  }

  function logout() {
    localStorage.removeItem('isProfessor');
    setIsProfessor(false);
  }

  return (
    <AuthContext.Provider value={{ isProfessor, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}