import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const validateToken = async (token) => {
    try {
      // Replace with your actual API endpoint for token validation
      const response = await axios.post('/api/validate-token', { token });
      if (response.data.valid) {
        setUser(response.data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      // Replace with your actual API endpoint for login
      const response = await axios.post('/api/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message to user)
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Simulated login for development purposes
  const simulatedLogin = (credentials) => {
    console.log('Simulated login with:', credentials);
    const fakeUser = { 
      id: 1, 
      name: credentials.name || 'John Doe', 
      email: credentials.email,
      company: credentials.company,
      industry: credentials.industry
    };
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);
    setUser(fakeUser);
    navigate('/dashboard');
  };

  const signup = async (userData) => {
    try {
      // In a real application, you would make an API call here
      // For now, we'll use the simulated login
      simulatedLogin(userData);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login: simulatedLogin, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;