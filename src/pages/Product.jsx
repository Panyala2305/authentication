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

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
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
