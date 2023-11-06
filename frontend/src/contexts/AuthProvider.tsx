import React, { useState, useEffect, ReactNode } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      console.log('token set');
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('token', authToken);
      console.log('token accquired from server');
    } else {
      localStorage.removeItem('token');
      console.log('token not found');
    }
  }, [authToken]);

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    console.log('logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
