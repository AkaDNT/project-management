"use client";
import React, { useEffect } from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { toggleDarkMode } from "@/state/themeSlice";
import { toggleSidebarCollapsed } from "@/state/sidebarSlice";

export default function Navbar() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.sidebar.isSidebarCollapsed
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <div className="flex justify-between px-3 py-4 bg-white dark:bg-black">
      {/* Search bar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button onClick={() => dispatch(toggleSidebarCollapsed())}>
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
        <div className="relative flex h-min w-auto">
          <Search className="absolute left-[4px] h-4 w-4 -translate-y-1/2 top-1/2 mr-2 transform cursor-pointer dark:text-white"></Search>
          <input
            className="bg-gray-200 w-full rounded-sm border-none p-2 pl-8 focus:border-transparent focus:outline-none placeholder-gray-600 dark:bg-gray-700
        dark:placeholder-white dark:text-white"
            type="search"
            placeholder="Search..."
          ></input>
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-6">
        <button
          className="rounded-sm p-2  hover:bg-gray-200 cursor-pointer"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {!isDarkMode ? <Moon></Moon> : <Sun className="text-white"></Sun>}
        </button>
        <Link href={"/settings"} className="rounded-sm p-2  hover:bg-gray-200">
          <Settings className="dark:text-white cursor-pointer"></Settings>
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1em] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
}
