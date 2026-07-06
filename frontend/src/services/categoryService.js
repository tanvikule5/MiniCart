import axios from "axios";

const API = "http://localhost:5000/api/categories";

export const getCategories = () => {
  return axios.get(API);
};