import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './router/Router'
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'react-oidc-context';
import { RouterProvider } from 'react-router-dom';

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_AUTHORITY,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <RouterProvider router={Routes} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
