import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import { getCategories } from "../services/categoryService";
import {
  getProductById,
  updateProduct,
} from "../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "",
    status: "",
    type: "",
    sellingPrice: "",
    rentPrice: "",
    rentDuration: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);

      const product = response.data.product;

      setFormData({
        title: product.title,
        description: product.description,
        condition: product.condition,
        status: product.status,
        type: product.type,
        sellingPrice: product.sellingPrice || "",
        rentPrice: product.rentPrice || "",
        rentDuration: product.rentDuration || "",
        categoryId: product.categoryId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const productData = {
      ...formData,
      sellingPrice: formData.sellingPrice
        ? Number(formData.sellingPrice)
        : null,
      rentPrice: formData.rentPrice
        ? Number(formData.rentPrice)
        : null,
      rentDuration: formData.rentDuration
        ? Number(formData.rentDuration)
        : null,
    };

    await updateProduct(id, productData, token);

    alert("Product updated successfully!");

    navigate("/my-listings");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
        "Failed to update product"
    );
  }
};

  return (
    <ProductForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      categories={categories}
      buttonText="Update Product"
    />
  );
}

export default EditProduct;