import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook de AuthContext

const AuthSuccess = () => {
  const { login } = useAuth(); // Obtener la función login del contexto
  const navigate = useNavigate(); // Crear una instancia de useNavigate
  const location = useLocation(); // Obtener la ubicación actual

  useEffect(() => {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const correo = params.get('correo');

    if (token && correo) {
      // Llamar a la función de login del contexto para almacenar el token y los datos del usuario
      login(token, { correo });

      // Guardar en localStorage si es necesario
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', correo);

      // Redirigir al dashboard
      navigate('/dashboard');
    } else {
      // Manejar el caso en que no haya token o correo (redireccionar al login, por ejemplo)
      navigate('/');
    }
  }, [login, navigate, location]);

  return (
    <div className="auth-success">
      <h2>Autenticando...</h2>
      <p>Por favor, espera mientras te redirigimos al dashboard.</p>
    </div>
  );
};

export default AuthSuccess;
