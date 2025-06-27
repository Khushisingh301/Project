
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

export default function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      {children}
      {children}
    </>
  );
}


