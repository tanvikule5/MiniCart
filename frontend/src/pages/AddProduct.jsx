import { useState } from "react";
//connect AddProduct to productService
import { createProduct } from "../services/productService";
import { useEffect } from "react";
import { getCategories } from "../services/categoryService";
import ProductForm from "../components/ProductForm";
function AddProduct(){
  //useState
const [formData, setFormData] = useState({
  title: "",
  description: "",
  condition: "",
  status: "",
  type: "",
  sellingPrice: "",
  rentPrice: "",
  rentDuration: "",
  categoryId: ""
});
//create state for categories
const [categories, setCategories] = useState([]);
//handleChange
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
//fetch categories
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      console.log(response.data);

      setCategories(response.data.categories);

    } catch (error) {
      console.log(error);
    }
  };

  fetchCategories();
}, []);
///handleSubmit

/*
  console.log(formData);  (const token = localStorage.getItem("token");)

  User logs in
      ↓
JWT stored in localStorage
      ↓
Add Product page
      ↓
Read token
      ↓
Send token to backend*/
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit clicked");

  try {
    const token = localStorage.getItem("token");

    const response = await createProduct(
      formData,
      token
    );

    console.log(response.data);

    alert("Product added successfully!");
  } catch (error) {
  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(error.response?.data?.message || "Failed to add product");
}
};

return (
  <ProductForm
    formData={formData}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    categories={categories}
    buttonText="Add Product"
  />
);
}
export default AddProduct;
