"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    router.push("/login"); // Optional, as logout might handle redirect, but explicit is good
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Welcome, {user?.name || "User"}!</p>
        <p className="mb-4 text-gray-600">
          This is a protected page. If you are seeing this, the middleware
          allowed you through.
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
