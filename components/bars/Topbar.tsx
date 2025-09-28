"use client";

import { Home, LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import { Logout } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sidebarLinks } from "@/constants";

export default function Topbar() {
  const { darkMode, setDarkMode } = useTheme();
  const path = usePathname();
  const route = useRouter();

  const handleLogout = async () => {
    const data = await Logout();
    if (!data.success) return toast.error(data.message);

    toast.success(data.message);
    route.refresh();
  };

  return (
    <header className="topbar">
      {/*//! App logo & name */}
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 sm:h-11 sm:w-11">
          <Image
            src="/logo.png"
            alt="logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <p className="text-heading4 sm:text-heading3 text-light-1">Tracker</p>
      </div>

      {/*//! links */}
      <nav className="max-md:hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex items-center gap-8">
          {sidebarLinks.map(({ Icon, route, label }) => {
            const isActive = path === route;
            return (
              <Link
                href={route}
                key={label}
                className={`
                  bg-gradient-to-r from-primary-800 via-dark-4 to-light-1 
                  bg-no-repeat bg-[length:0%_3px] bg-[position:0_100%] 
                  p-1 topbar-link
                  ${isActive && "bg-[length:100%_3px]"}
              `}
              >
                <Icon className="size-5 text-primary-500" />{" "}
                <span
                  className={`text-light-1 text-base ${
                    isActive && "text-primary-800"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/*//! Right buttons (theme, logout)  */}
      <div className="flex gap-5 items-center">
        {/*//* Theme Switcher */}
        <div
          onClick={() => {
            setDarkMode((prev: any) => !prev);
            localStorage.setItem("theme", darkMode ? "light" : "dark");
          }}
          className="relative w-6 h-6"
        >
          <Moon
            data-state={darkMode ? "close" : "open"}
            className="cursor-pointer absolute inset-0 size-6 animate-open_close !text-primary-500"
          />
          <Sun
            data-state={darkMode ? "open" : "close"}
            className="cursor-pointer absolute inset-0 size-6 animate-open_close !text-secondary-500"
          />
        </div>

        {/*//* Logout btn */}
        <button
          onClick={handleLogout}
          className="text-light-1 cursor-pointer hover:text-light-1/50"
        >
          <LogOut />
        </button>
      </div>
    </header>
  );
}
