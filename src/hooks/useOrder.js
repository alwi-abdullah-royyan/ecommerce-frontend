import { useState, useEffect } from "react";
import { changeOrderStatus, getAllOrder, getOrderById, getOrderByUser } from "@/services/orderService";

// 🟢 Hook to fetch all orders
export const useAllOrders = (token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchAllOrders = async () => {
      try {
        const orderData = await getAllOrder(token);
        setData(orderData);
      } catch (err) {
        setError("Failed to fetch all orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [token]);

  return { data, loading, error };
};

export const useOrderById = (id, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchOrderById = async () => {
      try {
        const orderData = await getOrderById(id, token);
        setData(orderData);
      } catch (err) {
        setError("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [id, token]);

  return { data, loading, error };
};

export const useChangeOrderStatus = (id, status, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeStatusHandler = async () => {
    if (!id || !status || !token) return;

    setLoading(true);
    setError(null);

    try {
      const updatedData = await changeOrderStatus(id, status, token);
      setData(updatedData);
    } catch (err) {
      setError("Failed to change order status.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, changeOrderStatus: changeStatusHandler };
};

export function useOrderUser(token) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrderByUser(token);

        if (response?.status === 200) {
          setOrders(response.data.data.content);
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return { orders, loading, error };
}
