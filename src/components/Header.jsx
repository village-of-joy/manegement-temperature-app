// src/components/Header.jsx
import React, { useState } from 'react';
import '../Header.css';
import { useAuth } from 'react-oidc-context';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <h1>温度管理アプリ</h1>
      </div>
      <div className="header__menu-icon" onClick={toggleMenu}>
        &#9776; {/* 三本線のメニューアイコン */}
      </div>
      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        <ul>
          <li><a href="#dashboard">ダッシュボード</a></li>
          <li onClick={() => auth.removeUser()}>Sign Out</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
