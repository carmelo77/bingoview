import axios from 'axios';
import type { AxiosInstance } from 'axios'
import { baseURL } from './baseURL';

const api: AxiosInstance = axios.create({
  baseURL: baseURL, // Reemplaza con la URL base de tu API
  // Agrega aquí cualquier otra configuración de Axios que desees usar globalmente
});

// Agrega un interceptor que maneje las respuestas 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status == 401) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api