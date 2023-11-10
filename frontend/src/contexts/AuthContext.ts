import React from 'react';

interface AuthContextType {
  authToken: string | null;
  email: string | null;
  setAuthToken: (token: string | null, email: string | null) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  authToken: null,
  email: null,
  setAuthToken: () => {},
  logout: () => {},
});

export default AuthContext;
