import { useState } from "react";
//connect AddProduct to productService
import { createProduct } from "../services/productService";
import { useEffect } from "react";
import { getCategories } from "../services/categoryService";
import ProductForm from "../components/ProductForm";
import toast from "react-hot-toast";
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

//image selection with preview
const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");

//handleChange
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

//for image
const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
};

//fetch categories
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      console.log(response.data);

      console.log("FULL CATEGORY RESPONSE:", response.data);

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

    /*const response = await createProduct(
      formData,
      token
    );  this formData does not allows to send img*/
    const data = new FormData();

Object.keys(formData).forEach((key) => {
  data.append(key, formData[key]);
});

if (image) {
  data.append("image", image);
}

const response = await createProduct(
  data,
  token
);

    console.log(response.data);

    toast.success("Product added successfully!");
  } catch (error) {
  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  toast.error(error.response?.data?.message || "Failed to add product");
}
};

return (
<ProductForm
  formData={formData}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  categories={categories}
  buttonText="Add Product"
  image={image}
  preview={preview}
  handleImageChange={handleImageChange}
/>
);
}
export default AddProduct;
