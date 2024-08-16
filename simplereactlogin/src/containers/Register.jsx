import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/containers/Register.styl';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/v1/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          password: password,
          role: 'cliente',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrarse');
      }

      const data = await response.json();
      const { token } = data;

      // Guardar el token en localStorage
      localStorage.setItem('authToken', token);

      setMessage('¡Te has registrado exitosamente!');
      navigate('/dashboard', { state: { token, email, data } });
    } catch (error) {
      setMessage('Error al registrarse. Inténtalo nuevamente.');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear una Cuenta</h2>
        <p className="subtitle">Completa los campos para registrarte</p>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleRegister}>
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
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Ingresa tu contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
