"use client";

import { createToken, User } from "@/lib/utils/jwt";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async () => {
    // Dummy user
    const user: User = {
      id: "1",
      name: "John Doe",
      email,
      role: "USER",
    };

    const token = await createToken(user);

    login({ ...user, token });

    // Also set cookie
    document.cookie = `auth_token=${token}; path=/`;

    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="w-full p-2 bg-blue-600 text-white rounded"
        onClick={handleLogin}
      >
        Sign In
      </button>
    </div>
  );
}
