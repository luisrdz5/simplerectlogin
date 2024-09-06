import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import '../styles/components/Login.styl';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; // Importa el hook de AuthContext


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [user, setUser] = useState(null); // Estado para almacenar el token
  const [message, setMessage] = useState(''); // Estado para almacenar mensajes de éxito o error
  const baseURL = process.env.REACT_APP_API_BASE_URL; // Acceso a la variable de entorno
  const { login } = useAuth(); // Obtener la función login del contexto
  
  const navigate = useNavigate(); // Crear una instancia de useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`${baseURL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      
      const { token, user  } = data;
      
      // Guardar el token en el estado
      setToken(token);
      setUser(user.correo);
      login(token, user);

      // Guardar el token en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', user.correo);

      navigate('/dashboard');
      // Mostrar mensaje de éxito
      setMessage('¡Has iniciado sesión exitosamente!');
    } catch (error) {
      // Manejar errores
      setMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en el login:', error);
    }
  };
  const handleFacebookLogin = () => {
    window.location.href = `${baseURL}/api/v1/auth/facebook`;
  };
  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/api/v1/auth/google`;
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido de Nuevo</h2>
        <p className="subtitle">Ingresa con tu cuenta para continuar</p>
        {message && <p className="message">{message}</p>} {/* Mostrar el mensaje */}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <div className="links">
          <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
          <span className="separator">|</span>
          <a href="/register" className="register">Crea una cuenta nueva</a>
        </div>
        <div className="divider">o</div>
        <div className="social-login">
          <button className="facebook-button" onClick={handleFacebookLogin}>
            <FaFacebookF className="icon" /> Continuar con Facebook
          </button>
          <button className="google-button" onClick={handleGoogleLogin}>
            <FaGoogle className="icon" /> Continuar con Google
          </button>
          <button className="apple-button">
            <FaApple className="icon" /> Continuar con Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
