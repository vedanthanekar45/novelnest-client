import axios from 'axios';
import refreshAccessToken from './tokens';


// Used to create an instance of axios
const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
})

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status == 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                error.config.headers.Authorization = `Bearer ${newAccessToken}`
                return axios(error.config);
            }
        }
        return Promise.reject(error);
    }
);

export default api;