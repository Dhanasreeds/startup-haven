import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = (token) => {
    // Mock token validation
    if (token === 'mock-token') {
      setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
    } else {
      logout();
    }
  };

  const login = async (credentials) => {
    // Mock login
    const mockUser = { id: 1, name: 'John Doe', email: credentials.email };
    const mockToken = 'mock-token';
    localStorage.setItem('token', mockToken);
    setUser(mockUser);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const signup = async (userData) => {
    // Mock signup
    const mockUser = { 
      id: 1, 
      name: userData.name, 
      email: userData.email,
      company: userData.company,
      industry: userData.industry
    };
    const mockToken = 'mock-token';
    localStorage.setItem('token', mockToken);
    setUser(mockUser);
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;