"use client";

import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { dashboardSidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-15 sm:top-18 left-0 z-15 bg-dark-2/70 rounded-lg shadow-md shadow-light-3/50 backdrop-blur-md transition-all duration-300 p-3
    `}
    >
      <div className="flex justify-evenly h-full gap-7">
        {dashboardSidebarLinks.map(({ Icon, route, label }) => {
          const isActive =
            (pathname.includes(route) && route !== "/dashboard") ||
            pathname === route;

          return (
            <Link
              key={label}
              href={route}
              className={`flex flex-col items-center text-light-1 p-2 sm:p-3 rounded-lg ${
                isActive ? "bg-primary-500/50 shadow-md shadow-primary-800/50" : "hover:bg-primary-500/20"
              }`}
            >
              <Icon className="shrink-0" />
              <p className="max-sm:hidden transition-all duration-300 whitespace-nowrap ">
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
