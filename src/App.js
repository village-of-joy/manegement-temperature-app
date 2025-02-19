import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    if (window.confirm("本当にSign Outしますか？")) {
      const clientId = process.env.REACT_APP_CLIENT_ID;
      const logoutUri = process.env.REACT_APP_LOGOUT_URL;
      const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
      console.log("サインアウトしました");
    } else {
      console.log("キャンセルしました")
    }};

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className='app'>
        <Header />
        <div className='dashboad'>
          <Dashboard />
          <button onClick={() => auth.removeUser()}>Sign Out</button>
        </div>
      </div>  
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign Out</button>
    </div>
  );
}

export default App;
