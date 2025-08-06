import axios from "axios";

const baseUrl = process.env.publicApi || "http:localhost:8000";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
