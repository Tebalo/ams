import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";
import DynamicSidebar from "@/components/Layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAMS",
  description: "Confiscated Asset Management Services",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`flex h-screen bg-slate-100 ${inter.className}`}>
      <DynamicSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/*<Appbar/>*/}
        <main className="flex-1 overflow-y-auto p-4">
          <Suspense fallback={<LoadingSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
      <Toaster />
    </div>
  );
}