import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/Recovery.styl';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  // Capturar el token de la URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/v1/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });
      

      if (!response.ok) {
        const errorData = await response.json(); // Extraer la respuesta del backend
        console.log(errorData.message)
        setMessage(errorData.message || 'Error al cambiar la contraseña');
        return; 
      }

      setMessage('¡Tu contraseña ha sido cambiada exitosamente!');
      setTimeout(() => navigate('/'), 3000); // Redirige a login después de 3 segundos
    } catch (error) {
      setMessage('Error al cambiar la contraseña. Inténtalo nuevamente.');
      console.error('Error en el cambio de contraseña:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Cambiar Contraseña</h2>
        <p className="subtitle">Ingresa tu nueva contraseña</p>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleChangePassword}>
          <div className="input-group">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input 
              type="password" 
              id="newPassword" 
              placeholder="Ingresa tu nueva contraseña" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="reset-button">Cambiar Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
