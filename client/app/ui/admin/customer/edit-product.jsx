"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TicketIcon,
  InboxIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import Link from "next/link";
import { Button } from "@/app/ui/admin/buttons";

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product.name || "",
    email: product.email || "",
    address: product.address || "",
    phone_number: product.phone_number || "",
    gender: product.gender || "Male",
    admin: product.is_admin === 1,
  });
  const [errors, setErrors] = useState({}); // Initialize as empty object
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "radio" ? parseInt(value, 10) : value, // Convert to number for radio inputs
      [name]: name === "admin" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state
    setErrors({}); // Reset errors

    const payload = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone_number: formData.phone_number,
      gender: formData.gender,
      is_admin: formData.admin,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/users/${product.user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Product updated successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        router.push("/admin/customers");
      } else {
        const result = await response.json();

        // Ensure `errors` is set as an object, even if the API doesn't return errors
        setErrors(result.errors || {});

        Swal.fire({
          icon: "error",
          title: result.message || "Failed to update product",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      // Handle network or other errors gracefully
      setErrors({ general: error.message });

      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Customer Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Customer name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <TicketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            {/* Conditionally render error message for 'name' */}
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Customer email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            {/* Conditionally render error message for 'email' */}
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Customer Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Customer Address
          </label>
          <div className="relative">
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Customer address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            {/* Conditionally render error message for 'address' */}
            {errors?.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>

        {/* Customer Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="mb-2 block text-sm font-medium"
          >
            Customer Phone Number
          </label>
          <div className="relative">
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="Enter Customer phone number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            {/* Conditionally render error message for 'phone_number' */}
            {errors?.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number}</p>
            )}
          </div>
        </div>

        {/* Customer Gender */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Customer Gender
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Male"
                  name="gender"
                  type="radio"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Male"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Female"
                  name="gender"
                  type="radio"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Female"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Is Admin */}

        {/* Submit Button */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/admin/customers"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Edit Order"}
          </Button>
        </div>
      </div>
    </form>
  );
}
