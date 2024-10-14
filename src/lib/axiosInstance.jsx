import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://cahero-ott-backend.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    console.log(token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Use backticks here for template literal
    }
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
