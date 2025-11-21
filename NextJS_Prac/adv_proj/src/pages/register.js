import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    // still dummy auth
    if (email && password) {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <form onSubmit={handleRegister} className="bg-white p-8 shadow rounded w-80">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

        <input
          className="w-full border p-2 rounded mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-zinc-800"
          type="submit"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
