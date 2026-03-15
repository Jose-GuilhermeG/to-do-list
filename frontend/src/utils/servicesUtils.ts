import axios ,{ type AxiosInstance } from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const createServiceHerder = (authorizationType? : "Bearer" , authorizationToken? : string )=>{
    return {
        Authorization :`${authorizationType} ${authorizationToken}`
    }
}


async function refreshToken() {
    const BASEURLPATH = "account/"
    const BASEURL = API_BASE_URL + BASEURLPATH
    const response = await axios.post(BASEURL + "token/refresh/", {
        refresh: localStorage.getItem("refresh"),
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
}

export const setRequestAuthHandler = (api : AxiosInstance) => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
    
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
    
          try {
            const newToken = await refreshToken();
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (err) {
            console.error("Refresh token inválido, redirecionando para login.");
            window.location.href = "/login";
          }
        }
    
        return Promise.reject(error);
      }
    );
}
