"use client";

import {
  UserGroupIcon,
  RectangleStackIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

// Map of links to display in the side navigation.

const links = [
  { name: "Products", href: "/admin", icon: RectangleStackIcon },

  { name: "Orders", href: "/admin/orders", icon: ArchiveBoxIcon },
  { name: "Customers", href: "/admin/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                " text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
