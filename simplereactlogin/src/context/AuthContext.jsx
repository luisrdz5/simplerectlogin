import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Manejar el token solo en memoria
  const [user, setUser] = useState(null); // Manejar el token solo en memoria

  const login = (newToken, newUser) => {
    setToken(newToken); // Guardar el token en el estado
    setUser(newUser.correo);
  };

  const logout = () => {
    setToken(null); // Limpiar el token del estado
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
