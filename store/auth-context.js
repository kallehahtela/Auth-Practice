import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState, useRef } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const logoutTimer = useRef(null); // Using useRef to persist the timer across renders

  useEffect(() => {
    return () => {
      // Cleanup timer when component unmounts
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);

    // Reset the timer whenever a new token is set
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    // Set a new logout timer for 10 minutes
    logoutTimer.current = setTimeout(() => {
      logout();
    }, 600000); // 10 minutes in milliseconds
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');

    // Clear the timer on logout
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;