import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//redux
import { Provider } from 'react-redux'; //provider guarda dados e compartilhe entre toda a aplicação
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
