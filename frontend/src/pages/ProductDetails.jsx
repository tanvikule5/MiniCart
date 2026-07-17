import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  if (!product) {
    return <h1 className="p-6 text-xl">Loading...</h1>;
  }
console.log(product);
console.log(product.seller);
return (
  <div className="min-h-screen bg-[#f6f7fb] dark:bg-gray-950 py-8 transition-colors">

    <div className="max-w-6xl mx-auto px-5 space-y-6">


      {/* TOP PRODUCT CARD */}

      <div
        className="
        bg-white dark:bg-gray-900
        rounded-2xl
        border border-gray-200/70 dark:border-gray-800
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        p-5
        "
      >

        <div className="grid md:grid-cols-2 gap-6">


          {/* IMAGE */}

          <div
            className="
            h-80
            rounded-xl
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-slate-100
            to-white
            dark:from-gray-800
            dark:to-gray-900
            "
          >

            <img
              src={
                product.images?.[0]?.imageUrl ||
                "https://placehold.co/500"
              }
              alt={product.title}
              className="
              max-h-72
              object-contain
              hover:scale-105
              transition
              duration-300
              "
            />

          </div>





          {/* PRODUCT INFO */}

          <div className="flex flex-col justify-center">


            



            <h1
              className="
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
              mt-2
              "
            >
              {product.title}
            </h1>



            <p
              className="
              text-3xl
              font-extrabold
              text-indigo-600
              dark:text-indigo-400
              mt-4
              "
            >
              ₹{product.sellingPrice || product.rentPrice}
            </p>




            <div className="flex flex-wrap gap-3 mt-5">


              <span
                className="
                px-3 py-1.5
                rounded-lg
                bg-indigo-50
                text-indigo-700
                dark:bg-indigo-900/30
                dark:text-indigo-300
                text-sm
                font-medium
                "
              >
                {product.category?.name}
              </span>



              <span
                className="
                px-3 py-1.5
                rounded-lg
                bg-emerald-50
                text-emerald-700
                dark:bg-emerald-900/30
                dark:text-emerald-300
                text-sm
                font-medium
                "
              >
                {product.condition}
              </span>




              <span
                className="
                px-3 py-1.5
                rounded-lg
                bg-orange-50
                text-orange-700
                dark:bg-orange-900/30
                dark:text-orange-300
                text-sm
                font-medium
                "
              >
                {product.type}
              </span>


            </div>




            



          </div>


        </div>

      </div>









      {/* DETAILS + SELLER */}


      <div className="grid md:grid-cols-3 gap-6">



        {/* DETAILS CARD */}


        <div
          className="
          md:col-span-2
          bg-white
          dark:bg-gray-900
          rounded-2xl
          border border-gray-200/70
          dark:border-gray-800
          shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          p-6
          "
        >


          <h2
            className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
            mb-5
            "
          >
            Product Details
          </h2>




          <div className="grid sm:grid-cols-2 gap-4">


            {[
              ["Category", product.category?.name],
              ["Condition", product.condition],
              ["Type", product.type],
              ["Status", product.status],
              [
                "Posted",
                new Date(product.createdAt)
                .toLocaleDateString("en-IN")
              ]

            ].map(([key,value]) => (

              <div
                key={key}
                className="
                bg-[#f8fafc]
                dark:bg-gray-800
                rounded-xl
                p-4
                border
                border-gray-100
                dark:border-gray-700
                "
              >

                <p
                  className="
                  text-xs
                  uppercase
                  text-slate-500
                  "
                >
                  {key}
                </p>


                <p
                  className="
                  mt-1
                  font-semibold
                  text-slate-900
                  dark:text-white
                  "
                >
                  {value}
                </p>


              </div>

            ))}


          </div>


        </div>








        {/* SELLER CARD */}


        <div
          className="
          bg-white
          dark:bg-gray-900
          rounded-2xl
          border border-gray-200/70
          dark:border-gray-800
          shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          p-6
          "
        >


          <h2
            className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            Seller
          </h2>




          <div className="mt-5">


            <h3
              className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
              "
            >
              {product.seller?.name}
            </h3>



            <p className="text-slate-500 mt-1">
              {product.seller?.department}
            </p>



            <p className="text-slate-500">
              Year {product.seller?.year}
            </p>


          </div>





          <div
            className="
            mt-5
            pt-4
            border-t
            border-gray-200
            dark:border-gray-800
            "
          >

            <p className="text-xs uppercase text-slate-500">
              Email
            </p>


            <p
              className="
              mt-1
              font-medium
              text-slate-900
              dark:text-white
              break-all
              "
            >
              {product.seller?.email}
            </p>


          </div>



        </div>



      </div>











    </div>

  </div>
);
}

export default ProductDetails;