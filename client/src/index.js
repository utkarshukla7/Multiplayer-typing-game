import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN_URL}
      clientId={process.env.REACT_APP_CLIENTID_URL}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Auth0Provider>,
);

