import axios from 'axios';

// Create a central Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// The Interceptor: Automatically attach the token before sending any request
api.interceptors.request.use(
  (config) => {
    // Grab the token from LocalStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global Error Handler: If the token expires, log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Force redirect back to login screen
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
