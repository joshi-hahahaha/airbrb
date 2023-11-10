import React, { useState, useEffect, ReactNode } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderState {
  authToken: string | null;
  email: string | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthProviderState>({
    authToken: null,
    email: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      const { authToken, email } = JSON.parse(storedData);
      setAuthState({ authToken, email });
      console.log('Authentication data loaded');
    }
  }, []);

  useEffect(() => {
    const { authToken, email } = authState;
    if (authToken) {
      localStorage.setItem('authData', JSON.stringify({ authToken, email }));
      console.log('Authentication data saved');
    } else {
      localStorage.removeItem('authData');
      console.log('Authentication data removed');
    }
  }, [authState]);

  const setAuthToken = (token: string | null, email: string | null) => {
    setAuthState({ authToken: token, email });
  };

  const logout = () => {
    setAuthToken(null, null);
    console.log('Logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
