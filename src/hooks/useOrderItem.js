import { useState, useEffect } from "react";
import { getOrderItemById } from "./services/orderItemService";

export const useOrderItemById = (id, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    setData(null);
    setError(null);
    setLoading(true);

    const fetchOrderItem = async () => {
      try {
        const orderItemData = await getOrderItemById(id, token);
        setData(orderItemData);
      } catch (err) {
        setError("Failed to fetch order item.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItem();
  }, [id, token]);

  return { data, loading, error };
};
