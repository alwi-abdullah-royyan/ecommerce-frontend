import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import InputOnchange from "@/components/atoms/InputOnchange";
import { useAllCategories } from "@/hooks/useCategory";
import { useProducts } from "@/hooks/useProduct";
import { getImageProduct } from "@/services/productService";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [name, setName] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, loading, error, totalPages } = useProducts(page, size, category, minPrice, maxPrice, name);
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useAllCategories();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Filter Section */}
      <div className="bg-gray-900 p-4  mb-6">
        {/* Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <span>Filter Products</span>
          <span>{isFilterOpen ? "▲" : "▼"}</span>
        </button>

        {/* Filter Section (Hidden when collapsed) */}
        {isFilterOpen && (
          <div className="mt-4 grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputOnchange
              type="text"
              placeholder="Product Name"
              className="p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name={"productName"}
            />
            <select className="p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <InputOnchange
              type="number"
              placeholder="Min Price"
              className="p-2 border rounded"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              name={"minPrice"}
            />
            <InputOnchange
              type="number"
              placeholder="Max Price"
              className="p-2 border rounded"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              name={"maxPrice"}
            />
            <ButtonOnclick
              onClick={() => setPage(0)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              label="Apply Filters"
            />
            <ButtonOnclick
              onClick={() => {
                setCategory("");
                setMinPrice("");
                setMaxPrice("");
                setName("");
                setPage(0);
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              label="Reset"
            />
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold text-center text-black mb-6">Product List</h1>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((product) => (
          <div
            key={product.id}
            className={`border text-black rounded-lg p-4 shadow-sm hover:shadow-md transition ${
              product.disabled ? "bg-gray-300" : "bg-white"
            }`}
            onClick={() => !product.disabled && router.push(`/product/${product.id}`)}
          >
            <Image
              src={getImageProduct(product.id)}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-md mb-3"
              width={100}
              height={100}
            />
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="">{product.description}</p>
            <p className="font-bold text-blue-500">${product.price}</p>
            <p className="text-sm text-gray-500">{product.category.name}</p>
            <p className={`text-sm ${product.disabled ? "text-red-500" : "text-green-500"}`}>
              {product.disabled ? "Out of Stock" : "In Stock"}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center text-black items-center gap-4 mt-6 sm:space-x-4 sm:flex-nowrap">
        <ButtonOnclick
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          label="Previous"
          disabled={page === 0}
          className="px-4 py-2 bg-blue-700 rounded disabled:opacity-30"
        />

        <span className="px-4 py-2">
          Page {page + 1} of {totalPages}
        </span>

        <ButtonOnclick
          onClick={() => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
          label="Next"
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-blue-700 rounded disabled:opacity-30"
        />

        {/* Jump to Page */}
        <InputOnchange
          type="number"
          placeholder="Page"
          value={page + 1}
          onChange={(e) => {
            let newPage = Number(e.target.value) - 1;
            if (newPage >= 0 && newPage < totalPages) {
              setPage(newPage);
            }
          }}
          className="p-2 w-16 text-center border rounded"
        />
      </div>
    </div>
  );
}
