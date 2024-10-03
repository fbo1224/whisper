// src/components/Header.js
import React from 'react';
import logoImg from '../../images/Logo.png'; // 여기서 logoImg를 import

const Header = () => {
  return (
    <header id="header">
      <div id="header_1">
        <img id="logo" src={logoImg} alt='LOGO' />
      </div>

      <div id="header_2"></div>
    </header>
  );
};

export default Header;
