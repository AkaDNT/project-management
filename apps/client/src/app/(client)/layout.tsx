import Navbar from "@/components/client/Navbar";
import Sidebar from "@/components/client/Sidebar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* sidebar */}
      <Sidebar></Sidebar>
      <main className="flex w-full flex-col bg-gray-50 dark:bg-[color:var(--color-dark-bg)] pl-3">
        {/* navbar */}
        <Navbar></Navbar>
        {children}
      </main>
    </div>
  );
}
