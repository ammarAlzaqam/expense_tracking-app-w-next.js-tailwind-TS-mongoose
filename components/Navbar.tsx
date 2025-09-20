"use client";

import { LayoutDashboard, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./providers/ThemeProvider";
import Link from "next/link";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <header className="sticky w-full bg-dark-2 px-3 sm:px-5 py-3 flex items-center justify-between">
      {/*//! App logo & name */}
      <div className="flex items-center gap-1 sm:gap-2">
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
      <nav>
        <Link
          href="/dashboard"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-light-1 text-base flex items-center gap-1"
        >
          <LayoutDashboard className="size-5 text-primary-500" />{" "}
          <span className="max-sm:hidden">Dashboard</span>
        </Link>
      </nav>

      {/*//! Theme Switcher */}
      <div
        onClick={() => {
          setDarkMode((prev: any) => !prev);
          localStorage.setItem("theme", darkMode ? "light" : "dark");
        }}
        className="relative w-7 h-7"
      >
        <Moon
          data-state={darkMode ? "close" : "open"}
          className="animate-open_close !text-primary-500"
        />
        <Sun
          data-state={darkMode ? "open" : "close"}
          className="animate-open_close !text-secondary-500"
        />
      </div>
    </header>
  );
}
