"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import Link from "next/link";
import { Logout } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sidebarLinks } from "@/constants";
import { useUserStore } from "@/lib/zustand/userStore";
import Upgrade from "../overlays/Upgrade";
import { FaStar } from "react-icons/fa";
import GenerateUpgradeCode from "../overlays/GenerateUpgradeCode";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const { darkMode, setDarkMode } = useTheme();
  const path = usePathname();
  const route = useRouter();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    const data = await Logout();
    if (!data.success) return toast.error(data.message);
    clearUser();
    toast.success(data.message);
    route.refresh();
  };

  if (!hydrated || !user) return <header className="topbar animate-pulse bg-dark-3 min-h-16"></header>;

  return (
    <header className="topbar">
      {/*//! App logo & name */}
      <div className="flex items-center gap-2">
        <div className="shrink-0 relative h-8 w-8 sm:h-11 sm:w-11">
          <Image
            src={user?.image ? user.image : "/assets/user.svg"}
            alt="logo"
            fill
            className={`rounded-full object-cover ${
              !user?.image && "p-1 bg-dark-2"
            }`}
          />
        </div>

        <div className="flex items-center gap-1">
          <p className="text-heading4 max-w-[70px] sm:max-w-[200px] sm:text-heading3 text-light-1 line-clamp-1">
            {user?.username ?? ""}
          </p>
          {user?.isPremium && (
            <span>
              <FaStar className="size-5 text-secondary-500" />
            </span>
          )}
        </div>
      </div>

      {/*//! links */}
      <nav className="max-md:hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex items-center gap-8">
          {sidebarLinks.map(({ Icon, route, label }) => {
            const isActive =
              (path.includes(route) && route !== "/") || path === route;
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
        {/*//* Upgrade btn */}
        {user?.admin ? (
          <GenerateUpgradeCode />
        ) : (
          !user?.isPremium && <Upgrade />
        )}

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
