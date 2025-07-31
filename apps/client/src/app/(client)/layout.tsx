"use client";
import Navbar from "@/components/client/Navbar";
import Sidebar from "@/components/client/Sidebar";
import { store } from "@/state/store";
import { Provider } from "react-redux";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:text-white dark:bg-[color:var(--color-dark-bg)]">
        {/* sidebar */}

        <Sidebar></Sidebar>
        <main className="flex w-full flex-col bg-gray-50 dark:bg-[color:var(--color-dark-bg)]">
          {/* navbar */}
          <Navbar></Navbar>
          <div className="ml-3">{children}</div>
        </main>
      </div>
    </Provider>
  );
}
