import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
        setMessage("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePayment = async (product) => {
    try {
      // Create Razorpay order
      
      const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: product.price,
          }),
        }
      );

      const order = await response.json();
       console.log(order);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "My Store",

        description: product.title,

        image: product.image,

        order_id: order.id,

        handler: async function (response) {
          const verify = await fetch(
        "http://localhost:5000/api/payment/verify",
        {
            method:"POST",

            credentials:"include",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                razorpay_order_id:response.razorpay_order_id,

                razorpay_payment_id:response.razorpay_payment_id,

                razorpay_signature:response.razorpay_signature,

                product
            })
        })
        },

        prefill: {
          name: "",

          email: "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Products
        </h1>

        {message && (
          <p className="text-center text-red-500 mb-6">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain"
              />

              <h2 className="mt-4 font-semibold text-lg line-clamp-2">
                {product.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>

                <button onClick={() => handlePayment(product)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;