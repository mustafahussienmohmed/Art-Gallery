import Image from "next/image";

import {
  DeleteCustomer,
  DeleteProduct,
  UpdateCustomer,
  UpdateProduct,
} from "../buttons";
import { fetchProducts, fetchUsers } from "../../../lib/data";
import { formatTitle } from "../../../lib/utils";

export default async function Table({ query, currentPage }) {
  const products = await fetchUsers();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.user_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p> {product.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{product.email}</p>
                  </div>
                  <p className="font-medium">{product.address}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className=" font-medium">{product.phone_number}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCustomer id={product.user_id} />
                    <DeleteCustomer id={product.user_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table overflow-y-scroll">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.user_id}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTitle(product.name)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.phone_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.address}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCustomer id={product.user_id} />
                      <DeleteCustomer id={product.user_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
