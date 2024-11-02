"use client"; // مكون عميل

import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

const Sculpture = () => {
  const [sculptures, setSculptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // لإدارة الأخطاء
  const token = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchSculptures = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/products?category_id=2"
        ); // استخدام category_id = 2 للمنحوتات
        if (!response.ok) {
          throw new Error("Network response was not ok"); // معالجة الأخطاء
        }
        const data = await response.json();
        const filteredProducts = data.filter(
          (product) => product.category_id === 2
        );
        setSculptures(filteredProducts);
      } catch (error) {
        console.error("Error fetching sculptures:", error);
        setError(error.message); // تخزين رسالة الخطأ
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    fetchSculptures();
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
        Sculptures
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sculptures.map((sculpture) => (
          <div
            key={sculpture.product_id}
            className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105"
          >
            {" "}
            {/* تعديل هنا */}
            <div className="relative">
              <Link href={`/customer/${sculpture.product_id}/view`}>
                <img
                  src={`/images/${sculpture.image}`} // استخدام الصورة من قاعدة البيانات
                  alt={sculpture.title}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </Link>
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                جديد
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                {sculpture.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {sculpture.description.slice(0, 60)}...
              </p>
              <p className="text-xl font-bold text-gray-900 mt-4">
                ${sculpture.price}
              </p>
              {token && (
                <button
                  onClick={() => addToCart(sculpture)}
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

export default Sculpture;
