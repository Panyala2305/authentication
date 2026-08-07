import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders", {
                    credentials: "include",
                });

                const data = await response.json();

                if (response.ok) {
                    setOrders(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-semibold">Loading Orders...</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10 px-6">
                <h1 className="text-4xl font-bold text-center mb-10">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white max-w-lg mx-auto rounded-lg shadow-md p-10 text-center">
                        <h2 className="text-2xl font-semibold mb-3">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500">
                            Purchase a product to see it here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-5xl mx-auto">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col md:flex-row gap-6"
                            >
                                <div className="flex justify-center">
                                    <img
                                        src={order.image}
                                        alt={order.title}
                                        className="h-44 w-44 object-contain"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-3">
                                        {order.title}
                                    </h2>

                                    <div className="space-y-2 text-gray-700">

                                        <p>
                                            <span className="font-semibold">
                                                Order ID :
                                            </span>{" "}
                                            {order._id}
                                        </p>

                                       

                                        <p>
                                            <span className="font-semibold">
                                                Payment ID :
                                            </span>{" "}
                                            {order.paymentId}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Amount :
                                            </span>{" "}
                                            ₹{order.price}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Status :
                                            </span>

                                            <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                {order.status}
                                            </span>
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Purchased On :
                                            </span>{" "}
                                            {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Orders;