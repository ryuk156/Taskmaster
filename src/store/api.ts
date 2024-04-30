import axios, { AxiosError } from "axios";
import { LoginCredentials } from "../interfaces/interface";

const URL= 'http://127.0.0.1:8082/api/'

export const loginAPI = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(URL + 'userlogin/', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw new Error("Login failed. Please try again later.");
      } else {
        console.error("Non-Axios error occurred:", error.message);
        throw new Error("Login failed. Please try again later.");
      }
    }
  };