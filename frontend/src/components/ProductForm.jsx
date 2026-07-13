function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  categories,
  buttonText,
  image,
  preview,
  handleImageChange,
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-gray-700 transition-colors duration-300"
        >
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              {buttonText === "Update Product"
                ? "Edit Product"
                : "Create Product"}
            </h1>

            <p className="text-slate-500 dark:text-gray-400 mt-2">
              Add all the necessary details about your product.
            </p>
          </div>

          {/* Basic Information */}
          <section className="border border-slate-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">
              📝 Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-medium mb-2 dark:text-gray-200">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Java Programming Book"
                  className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 dark:text-gray-200">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3 outline-none resize-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="border border-slate-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">
              💰 Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-2 dark:text-gray-200">
                  Product Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                >
                  <option value="">Select Type</option>
                  <option value="Sell">Sell</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              {formData.type === "Sell" && (
                <div>
                  <label className="block font-medium mb-2 dark:text-gray-200">
                    Selling Price (₹)
                  </label>

                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    placeholder="Enter selling price"
                    className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                  />
                </div>
              )}

              {formData.type === "Rent" && (
                <>
                  <div>
                    <label className="block font-medium mb-2 dark:text-gray-200">
                      Rent Price (₹)
                    </label>

                    <input
                      type="number"
                      name="rentPrice"
                      value={formData.rentPrice}
                      onChange={handleChange}
                      placeholder="Price per rental"
                      className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2 dark:text-gray-200">
                      Rent Duration (Days)
                    </label>

                    <input
                      type="number"
                      name="rentDuration"
                      value={formData.rentDuration}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                      className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Product Details */}
          <section className="border border-slate-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">
              📦 Product Details
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block font-medium mb-2 dark:text-gray-200">
                  Category
                </label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2 dark:text-gray-200">
                  Condition
                </label>

                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2 dark:text-gray-200">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-3"
                >
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>
          </section>

          {/* Product Image */}
          <section className="border border-slate-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">
              📷 Product Image
            </h2>

            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-gray-700 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <>
                  <span className="text-5xl">📷</span>

                  <p className="font-semibold mt-3 dark:text-white">
                    Click to upload image
                  </p>

                  <p className="text-sm text-slate-500 dark:text-gray-400">
                    PNG, JPG or JPEG
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </section>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-2xl font-semibold text-lg"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;