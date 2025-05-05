import React, { createContext, useState, useEffect } from 'react';

// A simple JWT decoder that extracts the payload (without verifying the signature).
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  // On initial mount, check for a token stored in localStorage.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = parseJwt(token);
        setAuth({ token, user: decoded.username });
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = parseJwt(token);
      localStorage.setItem('token', token);
      setAuth({ token, user: decoded.username });
    } catch (err) {
      console.error('Error decoding token during login:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
