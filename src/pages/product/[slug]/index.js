import { useRouter } from "next/router";
import Image from "next/image";
import { useDetailProduct } from "@/hooks/useProduct";
import Icons from "@/components/atoms/Icons";
import { isAdminUser } from "@/services/authService";
import { getImageProduct } from "@/services/productService";

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Extract product ID from slug (assuming slug format is "product-name-id")
  const id = slug ? slug.split("-").pop() : null;
  const { data: product, loading, error } = useDetailProduct(id);
  const isAdmin = isAdminUser();

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 text-lg">Product not found.</p>;

  const handleAddToCart = () => {
    alert(`Added ${product.productName} to cart!`);
    // TODO: Implement actual add-to-cart functionality here
  };

  const handleUpdateProduct = () => {
    router.push(`/admin/update-product/${product.id}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100 p-4">
      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full">
        {/* Back Button in Top-Right */}
        <button
          onClick={() => router.back()}
          className="absolute top-0 right-0 bg-blue-700 hover:bg-blue-900 rounded-tr-lg p-2"
        >
          <Icons.Back />
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-4">{product.productName}</h1>

        <div className="flex flex-wrap sm:flex-nowrap">
          <div className="flex justify-center">
            <Image
              src={getImageProduct(product.id)}
              alt={product.productName}
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <strong className="text-gray-900">Description:</strong> {product.description}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Category:</strong> {product.category.name}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Price:</strong> ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Stock:</strong> {product.qty} available
            </p>
            {product.disabled && (
              <p className="text-red-600 font-semibold mt-2">This product is currently unavailable.</p>
            )}

            {/* Buttons Container */}
            <div className="mt-6 flex space-x-4">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`px-6 py-2 text-white font-semibold rounded-lg ${
                  product.qty > 0 && !product.disabled
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={product.qty <= 0 || product.disabled}
              >
                Add to Cart
              </button>

              {/* Update Product Button (Only for Admins) */}
              {isAdmin && (
                <button
                  onClick={handleUpdateProduct}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                >
                  Update Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
