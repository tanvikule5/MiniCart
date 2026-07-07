import axios from "axios";

const API = "http://localhost:5000/api/products/create";

export const createProduct = async (productData, token) => {
  return axios.post(API, productData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const getProducts = () => {
  return axios.get("http://localhost:5000/api/products");
};
export const getMyProducts = async (token) => {
  return axios.get("http://localhost:5000/api/products/my/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (id, token) => {
  return axios.delete(`http://localhost:5000/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
/*Register.jsx
      ↓
authService.js
      ↓
Backend 

now : 

AddProduct.jsx
      ↓
productService.js
      ↓
Backend


✅ AddProduct UI
✅ productService.js
⬜ Connect AddProduct to productService
⬜ Backend route
⬜ Controller
⬜ Save to database
*/

