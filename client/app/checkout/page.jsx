"use client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";
import Footer from "../ui/Footer";
import Navbar from "../ui/navbar";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    AOS.init();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async () => {
    const totalAmount = total.toFixed(2);
    const userId = userData.user_id;

    const orderData = {
      total_amount: totalAmount,
      user_id: userId,
    };

    console.log("Order Data:", orderData);

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Product updated successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        router.push("/");
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to create order: ${errorData.message || "Unknown error"}`
        );
      }

      const responseData = await response.json();
      console.log("Order created successfully:", responseData);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(`There was an error processing your order: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <h1
          className="text-4xl font-bold mb-8 text-center text-blue-600"
          data-aos="fade-up"
        >
          Checkout
        </h1>
        <div
          className="bg-white p-4 rounded-lg shadow-md mb-8"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between my-4 border-b pb-4"
            >
              <Image
                src={`/images/${item.image}`}
                alt={item.title}
                width={100}
                height={100}
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-lg font-semibold">
                  {item.quantity} × ${Number(item.price).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Rating: {item.rating || "N/A"}
                </p>
              </div>
            </div>
          ))}
          <p className="text-xl font-bold mt-4 text-right">
            Total: ${total.toFixed(2)}
          </p>
        </div>
        {userData && (
          <div
            className="mb-8 bg-white shadow-lg rounded-lg p-6"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaUser className="ml-2 text-gray-500" />
                <span className="mt-1 block w-full p-2">{userData.name}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaEnvelope className="ml-2 text-gray-500" />
                <span className="mt-1 block w-full p-2">{userData.email}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaMapMarkerAlt className="ml-2 text-gray-500" />
                <span className="mt-1 block w-full p-2">
                  {userData.address}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <FaPhone className="ml-2 text-gray-500" />
                <span className="mt-1 block w-full p-2">
                  {userData.phone_number}
                </span>
              </div>
            </div>
          </div>
        )}
        <PayPalScriptProvider
          options={{ "client-id": "iYVTd3pPJjvbu0i4g8JPgZSR" }}
        >
          <div className="my-8" data-aos="fade-up">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                alert("Payment Successful!");
                setPaymentSuccess(true);
                localStorage.removeItem("cart");
                window.location.href = "/";
              }}
              onError={(err) => {
                console.error("PayPal Checkout Error", err);
              }}
            />
          </div>
        </PayPalScriptProvider>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200 w-full mb-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="mt-4 text-center text-gray-500">
          <p>
            By proceeding, you agree to our{" "}
            <a href="#" className="text-blue-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
