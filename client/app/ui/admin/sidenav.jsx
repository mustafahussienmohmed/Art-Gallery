"use client";
import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function SideNav() {
  const { logout, error, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-500 p-4 md:h-40">
        <div className="w-32 text-white md:w-40">
          <Image
            src={"/logo_1.avif"}
            className="rounded-full"
            alt={`Logo`}
            width={120}
            height={120}
          />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
