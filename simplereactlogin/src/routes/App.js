import React from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import RegisterContainer from '../containers/RegisterContainer.jsx';
import RecoveryContainer from '../containers/RecoveryContainer.jsx';
import AuthContainer from '../containers/AuthContainer.jsx';
import NotFound from '../containers/NotFound.jsx';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer.jsx';
import { AuthProvider } from '../context/AuthContext.jsx'; // Importa el AuthProvider
import ProtectedRoute from '../containers/ProtectedRoute.jsx'; // Importa el componente de rutas protegidas si lo tienes


const AppRoutes = () => {
    const routes = useRoutes([
      { path: '/', element: <LoginContainer /> },
      { path: '/dashboard', element: <ProtectedRoute element={<DashboardContainer />} /> },
      { path: '/register', element: <RegisterContainer /> },
      { path: '/recovery', element: <RecoveryContainer /> },
      { path: '/forgot-password', element: <ForgotPasswordContainer /> },
      { path: '/auth', element: <AuthContainer /> },
      { path: '*', element: <NotFound /> },
    ]);
    return routes;
  };
  
  const App = () => {
    return (
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    );
};



export default App;