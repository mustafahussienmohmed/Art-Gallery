import {
  CheckIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function OrderStatus({ status }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "Pending",
          "bg-green-500 text-white": status === "Shipped",
          "bg-red-500 text-white": status === "Cancelled",
          "bg-blue-500 text-white": status === "Delivered",
        }
      )}
    >
      {status === "Pending" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "Shipped" ? (
        <>
          Shipped
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "Delivered" ? (
        <>
          Delivered
          <PaperAirplaneIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "Cancelled" ? (
        <>
          Cancelled
          <XCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
