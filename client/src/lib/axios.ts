import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, 
});

export default api;
