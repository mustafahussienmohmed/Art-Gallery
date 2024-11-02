"use client"; // مكون عميل

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // لتحسين عرض الصور
import Swal from "sweetalert2";

const Painting = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // حالة الخطأ
  const token = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products"); // جلب جميع المنتجات
        if (!response.ok) throw new Error("فشل جلب المنتجات"); // تحقق من حالة الاستجابة
        const data = await response.json();

        // تصفية المنتجات الخاصة بالفئة ذات category_id 1
        const filteredProducts = data.filter(
          (product) => product.category_id === 1
        );
        setProducts(filteredProducts); // تخزين المنتجات المصفاة
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message); // تخزين رسالة الخطأ
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    fetchProducts();
  }, []);
  const addToCart = (product) => {
    const cartItem = {
      id: product.product_id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
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
  if (error) return <p className="text-center text-red-500">{error}</p>; // عرض رسالة الخطأ

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Paintings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105"
          >
            {" "}
            {/* تعديل هنا */}
            <div className="relative">
              <Link href={`/customer/${product.product_id}/view`}>
                <Image
                  src={`/images/${product.image}`} // تعديل مسار الصورة
                  alt={product.title}
                  width={300} // عرض الصورة
                  height={300} // ارتفاع الصورة
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </Link>
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                جديد
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {product.description.slice(0, 60)}...
              </p>
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
        ))}
      </div>
    </div>
  );
};

export default Painting;
