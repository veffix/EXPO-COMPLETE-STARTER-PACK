import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulez l'authentification de l'utilisateur
  useEffect(() => {
    // Remplacez par votre logique d'authentification
    const fakeUser = { id: 1, name: 'John Doe' }; // Simulez un utilisateur authentifié
    setUser(null);
    console.log('User set in AuthProvider:', fakeUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
