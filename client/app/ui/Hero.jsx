"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">{error}</div>;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative bg-gray-800 text-white h-[600px] overflow-hidden">
      <div className="w-full h-full relative">
        {products.length > 0 ? (
          <img
            src={`./images/${products[currentIndex]?.image}`}
            alt={products[currentIndex]?.title}
            className="w-full h-full object-contain transition-transform duration-1000 ease-in-out"
            style={{ maxHeight: "600px" }}
          />
        ) : (
          <div>No products available</div>
        )}
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        &gt;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-yellow-500" : "bg-gray-400"
            } transition`}
          />
        ))}
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
