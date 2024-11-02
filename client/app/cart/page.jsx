"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import Footer from "../ui/Footer";
import Navbar from "../ui/navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setAvailableProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/customer/login");
    }
  }, [currentUser, router]);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const addProductToCart = (product) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === product.product_id
    );

    if (existingItemIndex > -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: product.product_id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const removeProduct = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        {cartItems.length !== 0 ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Shopping Cart
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center w-full md:w-auto">
                    <Image
                      src={`/images/${item.image}`}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition duration-200">
                        {item.title}
                      </h3>
                      <div className="flex items-center mt-2 md:mt-0">
                        <button
                          onClick={() => decreaseQuantity(index)}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                        >
                          <FiMinus />
                        </button>
                        <span className="mx-2 text-lg font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(index)}
                          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProduct(index)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200 mt-4 md:mt-0"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Clear Cart
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                Total: ${total.toFixed(2)}
              </h2>
            </div>
            <div className="mt-6 flex justify-end">
              <Link href="/checkout">
                <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="min-h-screen text-center flex justify-center items-center text-4xl text-gray-500">
            Your cart is empty
          </p>
        )}
        <h2 className="text-2xl font-bold mt-6">Add Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {availableProducts.map((product) => (
            <div
              key={product.product_id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`/images/${product.image}`}
                alt={product.title}
                className="object-cover rounded-lg h-52 w-full"
              />
              <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition duration-200">
                {product.title}
              </h3>
              <p className="text-xl font-bold text-gray-900">
                ${Number(product.price).toFixed(2)}
              </p>
              <button
                onClick={() => addProductToCart(product)}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
