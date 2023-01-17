import axios from "axios";
import { WIFI } from "../../Constants";


const API_URL = `http://${WIFI}:5000/api/users/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
