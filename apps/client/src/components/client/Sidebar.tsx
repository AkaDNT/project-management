import { LockIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Sidebar() {
  return (
    <div
      className="flex flex-col justify-between z-40 transition-all duration-300 h-[100#] w-64 
    overflow-y-auto shadow-2xl bg-white dark:bg-black "
    >
      {/* top contents */}
      <div className="flex flex-col h-[100%] w-full justify-start">
        <div className="flex items-center justify-between px-6 pt-3 min-h-[56px] w-64 bg-white dark:bg-black">
          <Image src={"/logo.png"} alt="logo" width={70} height={70}></Image>
        </div>
        <div className="flex flex-col border-y-[1px] border-gray-200 dark:border-gray-700 tracking-widest">
          <div className="flex items-center justify-center">
            <div className="text-xl font-bold dark:text-white">AKADNT TEAM</div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <LockIcon className="h-3 w-3 text-gray-500 dark:text-gray-400"></LockIcon>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Private</p>
          </div>
        </div>
      </div>
    </div>
  );
}
