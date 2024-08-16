import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../containers/Login.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import Register from '../containers/Register.jsx';
import Recovery from '../containers/Recovery.jsx';
import NotFound from '../containers/NotFound.jsx';
import ForgotPassword from '../containers/ForgotPassword.jsx';

const App = () => {
    const routes = useRoutes([
      { path: '/', element: <Login /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/register', element: <Register /> },
      { path: '/recovery', element: <Recovery /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '*', element: <NotFound /> },
    ]);
    return routes;
  };
  

export default App;