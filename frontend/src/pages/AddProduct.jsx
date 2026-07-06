import { useState } from "react";
//connect AddProduct to productService
import { createProduct } from "../services/productService";
import { useEffect } from "react";
import { getCategories } from "../services/categoryService";
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


return(<div>
  <form onSubmit={handleSubmit}>
  <input
  type="text"
  name="title"
  placeholder="Product Title"
  value={formData.title}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
/>
  
  <textarea
  name="description"
  placeholder="Description"
  value={formData.description}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
/>


  <select
  name="condition"
  value={formData.condition}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Condition</option>
  <option value="New">New</option>
  <option value="Used">Used</option>
</select>

    <select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Status</option>
  <option value="Available">Available</option>
  <option value="Sold">Sold</option>
</select>


  <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Type</option>
  <option value="Sell">Sell</option>
  <option value="Rent">Rent</option>
</select>


  <input
  type="number"
  name="sellingPrice"
  placeholder="Selling Price"
  value={formData.sellingPrice}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
/>

  <input
  type="number"
  name="rentPrice"
  placeholder="Rent Price"
  value={formData.rentPrice}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
/>


  <input
  type="number"
  name="rentDuration"
  placeholder="Rent Duration (Days)"
  value={formData.rentDuration}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
/>

  <select
  name="categoryId"
  value={formData.categoryId}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>

  <button
  type="submit"
  className="w-full bg-indigo-600 text-white py-3 rounded-lg"
>
  Add Product
</button>

</form>
</div>
);
}
export default AddProduct;
