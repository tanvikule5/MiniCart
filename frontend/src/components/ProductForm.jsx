function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  categories,
  buttonText,
}) {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200"
        >
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              {buttonText === "Update Product"
                ? "Edit Product"
                : "Create Product"}
            </h1>

            <p className="text-slate-500 mt-2">
              Add all the necessary details about your product.
            </p>
          </div>

          {/* Basic Information */}
          <section className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              📝 Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-medium mb-2">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Java Programming Book"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              💰 Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium mb-2">
                  Product Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="">Select Type</option>
                  <option value="Sell">Sell</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Selling Price
                </label>

                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Rent Price
                </label>

                <input
                  type="number"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Rent Duration (Days)
                </label>

                <input
                  type="number"
                  name="rentDuration"
                  value={formData.rentDuration}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>
            </div>
          </section>

          {/* Product Details */}
          <section className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              📦 Product Details
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block font-medium mb-2">
                  Category
                </label>

                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Condition
                </label>

                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>
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