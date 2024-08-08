import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../containers/Login.jsx';
import Register from '../containers/Register.jsx';
import Recovery from '../containers/Recovery.jsx';
import NotFound from '../containers/NotFound.jsx';

const App = () => {
    const routes = useRoutes([
      { path: '/', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/recovery', element: <Recovery /> },
      { path: '*', element: <NotFound /> },
    ]);
    return routes;
  };
  

export default App;