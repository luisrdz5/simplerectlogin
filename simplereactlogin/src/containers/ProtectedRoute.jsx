import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Asegúrate de ajustar la ruta si es necesario

const ProtectedRoute = ({ element }) => {
  const { token } = useAuth();

  return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;

