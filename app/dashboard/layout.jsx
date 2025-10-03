"use client";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/layouts/Sidebar";
import { Navbar } from "@/components/layouts/Navbar";
import AuthLoader from "@/components/AuthLoader";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/services/auth";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("تم تسجيل الخروج");
    router.push("/login");
  };

  return (
    <AuthLoader>
      <ProtectedRoute>
        <SidebarProvider>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SidebarLayout
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              handleLogout={handleLogout}
              user={user}
            />

            {/* Main content */}
          </div>
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              collapsed && "ml-20"
            }`}
          >
            {/* Navbar */}
            <Navbar
              collapsed={collapsed}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              user={user}
              handleLogout={handleLogout}
            />

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-auto bg-gray-50">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthLoader>
  );
}
