"use client";
import Link from "next/link";
import clsx from "clsx";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Swal from "sweetalert2";

export function CreateProduct() {
  return (
    <Link
      href="/admin/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Product</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

//pass as action in form
// const deleteInvoiceWithId = deleteInvoice.bind(null, id);
export function DeleteProduct({ id }) {
  const [message, setMessage] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE", // DELETE request to the API
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Product deleted successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
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
      // setErrors(result.errors || { general: "An error occurred" });
      Swal.fire({
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-600 hover:text-white"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
}

export function UpdateProduct({ id }) {
  return (
    <Link
      href={`/admin/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-600 hover:text-white"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }) {
  const [message, setMessage] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE", // DELETE request to the API
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Customer deleted successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
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
      // setErrors(result.errors || { general: "An error occurred" });
      Swal.fire({
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-600 hover:text-white"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
}

export function UpdateCustomer({ id }) {
  return (
    <Link
      href={`/admin/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-600 hover:text-white"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function UpdateOrder({ id }) {
  return (
    <Link
      href={`/admin/orders/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-600 hover:text-white"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteOrders({ id }) {
  const [message, setMessage] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE", // DELETE request to the API
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Order deleted successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
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
      // setErrors(result.errors || { general: "An error occurred" });
      Swal.fire({
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-600 hover:text-white"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
}

export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
