import {
  DeleteOrders,
  DeleteProduct,
  UpdateOrder,
  UpdateProduct,
} from "../buttons";

// import { formatTitle } from "../../../lib/utils";
import { fetchOrders, fetchUsersById } from "@/app/lib/data";
import OrderStatus from "./status";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";

export default async function Table() {
  const orders = await fetchOrders();
  async function getUserName(id) {
    const user = await fetchUsersById(id);
    return user.name;
  }

  async function getUserEmail(id) {
    const user = await fetchUsersById(id);
    return user.email;
  }
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{}</p>
                    </div>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </div>
                  <OrderStatus status={order.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{order.total_amount}$</p>
                    <p>{formatDateToLocal(order.order_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateOrder id={order.order_id} />
                    <DeleteOrders id={order.order_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders?.map((order) => (
                <tr
                  key={order.order_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      {/* <p>{invoice.name}</p> */}
                      {getUserName(order.user_id)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {getUserEmail(order.user_id)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.total_amount}$
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.order_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateOrder id={order.order_id} />
                      <DeleteOrders id={order.order_id} />
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
