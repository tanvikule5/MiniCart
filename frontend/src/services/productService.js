import axios from "axios";

const API = "http://localhost:5000/api/products/create";

export const createProduct = async (productData, token) => {
  return axios.post(API, productData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
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

