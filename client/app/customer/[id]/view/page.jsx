"use client"; // مكون عميل

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // استخدام next/navigation
import Swal from "sweetalert2";

const ProductDetails = ({ params }) => {
  const router = useRouter();
  const id = params.id; // الحصول على معرف المنتج من الرابط
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:5000/products/${id}`);
          const data = await response.json();
          setProduct(data); // تخزين بيانات المنتج
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false); // إنهاء التحميل
        }
      };

      fetchProduct();
    }
  }, [id]);

  // دالة لإضافة المنتج إلى السلة
  const addToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // تعيين الكمية إلى 1 عند الإضافة
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

  if (!product)
    return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
        {product.title}
      </h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={`/images/${product.image}`}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover"
        />
        <div className="md:ml-6">
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-gray-900 mt-4">
            ${product.price}
          </p>
          {token && (
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
            >
              Add to cart{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
