import { useCart } from "@/hooks/useCart";
import { getToken } from "@/services/authService";
import { getImageProduct } from "@/services/productService";
import { deleteCart } from "@/services/cartService";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FloatingCart = () => {
  const [isClient, setIsClient] = useState(false);
  const token = getToken();
  const { data: cart, refetch } = useCart(token);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Ensure this runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // List of pages where the cart should NOT appear
  const hiddenPages = ["/checkout", "/cart"];

  // Prevent hydration errors by ensuring client-side rendering
  if (!isClient || !token || hiddenPages.includes(router.pathname)) {
    return null;
  }

  const handleDelete = async (id) => {
    await deleteCart(id, token);
    refetch(); // Refresh cart after deletion
  };

  const handleCheckout = () => {
    router.push("/cart"); // Navigate to the main cart page
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Cart Button */}
      <div
        className="relative w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-600 transition"
        onClick={() => setOpen(!open)}
      >
        🛒
        {cart?.data?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {cart.data.length}
          </span>
        )}
      </div>

      {/* Cart Dropdown */}
      {open && (
        <div className="absolute bottom-20 right-0 w-72 bg-gray-900 text-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold text-center">Your Cart</h3>

          {cart?.data?.length === 0 ? (
            <p className="text-center text-gray-400">Cart is empty</p>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              {cart.data.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-700">
                  <Image
                    src={getImageProduct(item.product.image)}
                    width={40}
                    height={40}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-md"
                  />
                  <div className="flex-1 ml-3">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 text-sm">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Checkout Button */}
          {cart?.data?.length > 0 && (
            <button
              onClick={handleCheckout}
              className="w-full mt-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Go to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
