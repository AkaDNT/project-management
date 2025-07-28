import React from "react";
import { Search, Settings } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between px-3 py-4 bg-white dark:bg-black">
      {/* Search bar */}
      <div className="flex relative w-[200px] h-min">
        <Search className="absolute left-[4px] h-4 w-4 -translate-y-1/2 top-1/2 mr-2 transform cursor-pointer dark:text-white"></Search>
        <input
          className="bg-gray-200 w-full rounded-sm border-none p-2 pl-8 focus:border-transparent focus:outline-none placeholder-gray-600 dark:bg-gray-700
        dark:placeholder-white dark:text-white"
          type="search"
          placeholder="Search..."
        ></input>
      </div>
      {/* Icons */}
      <div className="flex items-center">
        <Link href={"/settings"} className="rounded-sm p-2  hover:bg-gray-200">
          <Settings className="dark:text-white cursor-pointer"></Settings>
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1em] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
}
