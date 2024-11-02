"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  TagIcon,
  PlusIcon,
  CurrencyDollarIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../buttons";

// Validation schema using Yup
const ProductSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Please upload an image")
    .test(
      "fileSize",
      "File is too large (max 5MB)",
      (value) => value && value.size <= 5 * 1024 * 1024
    )
    .test(
      "fileFormat",
      "Unsupported Format (Only JPG, PNG allowed)",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
  category: Yup.string().required("Please select a category"),
  title: Yup.string().required("Please enter a title"),
  description: Yup.string().required("Please enter a description"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .min(0.01, "Please enter an amount greater than $0")
    .required("Amount is required"),
});

export default function ProductForm({ categories }) {
  const [imagePreview, setImagePreview] = useState("");

  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("category_id", values.category);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.amount);
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });
      console.log(formData);

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Product created successfully!",
          showConfirmButton: false,
          timer: 3000,
        });

        router.push("/admin");
      } else {
        setErrors(result.errors || { general: "An error occurred" });
        Swal.fire({
          icon: "error",
          title: `${result.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("image", file); // Set the file in Formik
      setImagePreview(URL.createObjectURL(file)); // For preview
    }
  };

  return (
    <Formik
      initialValues={{
        image: null,
        category: "",
        amount: "",
        title: "",
        description: "",
      }}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Image Input */}
          <div className="mb-4 flex items-center">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium mr-5"
            >
              Choose Image
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/jpeg, image/png,image/jpg"
                className="sr-only"
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              <label
                htmlFor="image"
                className="relative flex min-h-[50px] items-center justify-center rounded-md border border-dashed bg-white hover:cursor-pointer hover:bg-slate-300 border-[#e0e0e0] p-6 text-center transition-colors"
              >
                {imagePreview ? (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <PlusIcon className="pointer-events-none h-[30px] w-[30px] text-gray-500" />
                )}
              </label>
              <ErrorMessage
                name="image"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Product Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <TicketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <ErrorMessage
                name="title"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Product Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter a description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <TicketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <ErrorMessage
                name="description"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Category
            </label>
            <div className="relative">
              <Field
                as="select"
                id="category"
                name="category"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </Field>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <ErrorMessage
              name="category"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Product Amount
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter USD amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <ErrorMessage
                name="amount"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>
          </div>

          {/* Submission Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/admin"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create Product"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
