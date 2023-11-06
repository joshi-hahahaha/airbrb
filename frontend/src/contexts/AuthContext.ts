import React from 'react';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  authToken: null,
  setAuthToken: () => {},
  logout: () => {}
});

export default AuthContext;
