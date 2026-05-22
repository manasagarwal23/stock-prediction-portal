import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_BASE_API

const axiosInstance = axios.create({
  baseURL: baseURL, 
  headers: {
    'Content-Type': 'application/json',
  }
})

//Request interceptor
axiosInstance.interceptors.request.use(
  function(config){
    const access_token = localStorage.getItem('accessToken');
    if(access_token){
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
  }, 
  function(error){
    return Promise.reject(error);
  }
)

//Response interceptor
axiosInstance.interceptors.response.use(
  function(response){
    return response;
  },
  // handling failed responses
  async function(error){
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry){ 
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem('refreshToken');
      try{
        const response = await axiosInstance.post('/token/refresh/', {refresh: refresh_token})
        localStorage.setItem('accessToken', response.data.access)
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
        return axiosInstance(originalRequest)
      }catch(error){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    }
    return Promise.reject(error);
  }
)
export default axiosInstance;