import React, { useState } from 'react';
import '../styles/components/ForgotPassword.styl';
import { useNavigate } from 'react-router-dom'; 


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate(); // Crear una instancia de useNavigate

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/v1/auth/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error en la recuperación de contraseña');
      }

      setMessage('¡Revisa tu correo para recuperar la contraseña!');
      setTimeout(() => navigate('/'), 3000); // Redirige a login después de 3 segundos
    } catch (error) {
      setMessage('Error al intentar recuperar la contraseña. Inténtalo nuevamente.');
      console.error('Error en la recuperación de contraseña:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Recuperar Contraseña</h2>
        <p className="subtitle">Ingresa tu correo electrónico para recibir las instrucciones</p>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Ingresa tu correo" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="recovery-button">Recuperar Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
