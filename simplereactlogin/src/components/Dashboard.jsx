import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/components/Dashboard.styl';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  //const location = useLocation();
  const { token, user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Dashboard</h2>
        <p className="subtitle">Detalles de tu sesión</p>
        <div className="info-group">
          <label>Token:</label>
          <p className="info">{token}</p>
        </div>
        <div className="info-group">
          <label>Email:</label>
          <p className="info">{user ? user : 'Usuario no disponible'}</p> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
