import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) {
      setError("Fix validation errors before submitting");
      return;
    }
    try {
      const res = await login(email, password);
      onLogin(res.token);
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg w-full max-w-md sm:max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          className="border p-2 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && email && (
          <p className="text-red-500 text-sm mb-1">Enter a valid email</p>
        )}
        <input
          type="password"
          className="border p-2 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && password && (
          <p className="text-red-500 text-sm mb-1">
            Password must be at least 6 characters
          </p>
        )}
        <button
          disabled={!isFormValid}
          className={`w-full py-2 rounded font-semibold transition-colors duration-200 ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Login
        </button>
        <p className="mt-2 text-sm text-center">
          No account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
