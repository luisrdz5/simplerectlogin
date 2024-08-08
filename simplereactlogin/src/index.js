import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import App from './routes/App';

//const history = createBrowserHistory();



const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Suspense fallback={<div>Cargando...</div>}>
    <App />
  </Suspense>
);


