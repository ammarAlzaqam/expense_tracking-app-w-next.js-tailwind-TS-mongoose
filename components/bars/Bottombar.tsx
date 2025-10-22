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
              className={`bottombar-link  `}
            >
              <div className="relative">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                  <span
                    className={`min-w-16 h-16 rounded-full ${
                      isActive &&
                      "bg-[radial-gradient(circle,rgba(25,210,170,0.4)_0%,rgba(25,210,170,0.1)_45%,transparent_70%)]"
                    }`}
                  />
                </span>
                <Icon className={`size-6 text-light-1`} />
              </div>
              <span className="text-light-2 text-subtle">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
