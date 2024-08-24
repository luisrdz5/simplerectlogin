import React from 'react';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta si es necesario
import '../styles/components/Header.styl'; // Asegúrate de que la ruta es correcta

const Header = () => {
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redireccionar a la página de login después de cerrar sesión
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/images/logo-dashito.png" alt="Logo Dashito" />
      </div>
      {token && (
        <div className="header-user">
          <span className="header-user-greeting">¡Hola, Usuario!</span>
          <button className="header-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
