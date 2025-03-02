import { useOrder, useOrderUser } from "@/hooks/useOrder";
import { getToken } from "@/services/authService";
import { useState, useMemo } from "react";

const OrderHistory = () => {
  const token = getToken();
  const { orders, loading, error } = useOrderUser(token);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!orders.length) return <p className="text-center text-gray-400 text-lg">No orders found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-gray-800 rounded-md cursor-pointer"
            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium text-sm sm:text-base">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-white font-bold text-sm sm:text-lg">${order.totalPrice.toFixed(2)}</p>
            </div>

            {/* Expand Details */}
            {selectedOrder === order.id && (
              <div className="mt-2 p-3 bg-gray-700 rounded">
                <p className="text-white text-sm">More details about this order...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
