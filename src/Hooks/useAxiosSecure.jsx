import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://medical-camp-management-system-backend-side.vercel.app",
  // baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  // request interceptor to add authorization for header and call to the every secure route apis
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      console.log("stoped by interceptors", token);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //response interceptos
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logOut();
        navigate("/login");
      }
      console.log("error for status in the interceptors", error);
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
