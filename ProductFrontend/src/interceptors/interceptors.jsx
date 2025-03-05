import axios from "axios";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// axios.defaults.baseURL="http://localhost:8000";
const axiosInstance = axios.create({
  baseURL: "http://localhost:2000",
  withCredentials: true,
});

// const protectedRoutes = ['/getUser','/addUser','/updateUser','/deleteUser'];

// axiosInstance.interceptors;

axiosInstance.interceptors.request.use((request) => {
  console.log("Request: ", request);
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response: ", response);
    return response;
  }
);

export default axiosInstance;
