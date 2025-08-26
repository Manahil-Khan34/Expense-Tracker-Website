import axios from 'axios';
import { BASE_URL } from './apiPaths';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

//REQUEST INTERCEPTORS
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;      
    },
    (error) => {
      return Promise.reject(error);
    }   
    );

    //RESPONSE INTERCEPTORS
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
            // Handle common error globally
            if (error.response.status === 401) {
                //Redurect to login page if unauthorized
                window.location.href = '/login';
            } else if (error.response.status === 500) {
                //Handle server error
                console.error('Server error: try again later', error.response.data);
            }
      }
      else if (error.code === 'ECONNABORTED') {
        // Handle timeout error
        console.error('Request timed out. Please try again later.', error.message);
      }
      return Promise.reject(error);
    }
    );

    export default axiosInstance;