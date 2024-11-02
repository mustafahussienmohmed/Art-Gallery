"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!currentUser) {
      router.push("/customer/login");
      return;
    }

    const cartItem = {
      id: product.product_id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: `${product.title} has been added to the cart!`,
    });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-5 text-center text-gray-800">
        Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
          >
            <Link href={`/customer/${product.product_id}/view`}>
              <img
                src={`./images/${product.image}`}
                alt={product.title}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </Link>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {product.description.slice(0, 60)}...
              </p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                ${product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
