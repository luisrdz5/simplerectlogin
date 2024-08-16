import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/containers/Dashboard.styl';

const Dashboard = () => {
  const location = useLocation();
  const { token, email, data } = location.state || {}; // Acceder a los datos pasados

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
          <p className="info">{email}</p>
        </div>
        <div className="info-group">
          <label>Datos Completos:</label>
          <pre className="info json">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
