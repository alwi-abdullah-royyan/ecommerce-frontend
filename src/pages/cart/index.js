import { useCart } from "@/hooks/useCart";
import { getToken } from "@/services/authService";
import { getImageProduct } from "@/services/productService";
import { checkCart, manageCart, deleteCart } from "@/services/cartService";
import Image from "next/image";
import { useState, useMemo } from "react";
import { createOrder } from "@/services/orderService";
import { useToast } from "@/services/ToastService";

const Cart = () => {
  const token = getToken();
  const { data: cart, loading, error, refetch } = useCart(token);
  const [checkedItems, setCheckedItems] = useState({});
  const { showToast } = useToast();

  const handleCheck = async (id, checked) => {
    await checkCart(id, checked, token);
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleQtyChange = async (qty, productId) => {
    await manageCart(qty, productId, token);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteCart(id, token);
    refetch(); // Refresh cart after deletion
  };

  const totalPrice = useMemo(() => {
    if (!cart?.data) return 0;
    return cart.data
      .filter((item) => checkedItems[item.id] ?? item.checked)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart, checkedItems]);

  const handleBuy = async () => {
    try {
      const response = await createOrder(token);
      console.log(response);

      response.status === 200
        ? showToast("Order created successfully.")
        : showToast(response.response.data.message, "error");
    } catch (error) {
      console.log(error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Shopping Cart</h2>

      {cart?.data?.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.data.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between p-4 bg-gray-800 rounded-md">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input
                    type="checkbox"
                    checked={checkedItems[item.id] ?? item.checked}
                    onChange={(e) => handleCheck(item.id, e.target.checked)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <Image
                    src={getImageProduct(item.product.image)}
                    width={80}
                    height={80}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">{item.product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleQtyChange(item.qty - 1, item.product.id)}
                        disabled={item.qty <= 1}
                        className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-white">{item.qty}</span>
                      <button
                        onClick={() => handleQtyChange(item.qty + 1, item.product.id)}
                        className="px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0">
                  <p className="text-white font-bold text-sm sm:text-lg">${(item.price * item.qty).toFixed(2)}</p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="ml-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price & Buy Button */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xl text-white font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleBuy}
              disabled={totalPrice === 0}
              className="px-4 py-2 mt-3 sm:mt-0 bg-green-500 text-white rounded disabled:opacity-50"
            >
              Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
