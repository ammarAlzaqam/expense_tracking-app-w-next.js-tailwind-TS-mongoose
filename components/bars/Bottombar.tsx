"use client";

import Link from "next/link";
import { Home, LayoutDashboard, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

export default function Bottombar() {
  const pathname = usePathname();

  return (
    <div className="bottombar">
      <nav className="bottombar-container">
        {sidebarLinks.map(({ Icon, route, label }) => {
          const isActive =
            (pathname.includes(route) && route !== "/") || pathname === route;
          return (
            <Link
              key={label}
              href={route}
              className={`${
                isActive &&
                "shadow-md shadow-primary-800 bg-dark-2 dark:!bg-dark-3/50"
              } bottombar-link`}
            >
              <Icon
                className={`size-6 text-light-1 ${
                  isActive && "!text-primary-500"
                }`}
              />
              <span className="text-light-1 text-subtle">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
