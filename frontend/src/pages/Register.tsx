import { useState } from "react";
import { register } from "../api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

interface RegisterProps {
  onRegister: (token: string) => void;
}

export default function Register({ onRegister }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const res = await register(email, password);
      Cookies.set("token", res.token, { expires: 1 / 24 });

      onRegister(res.token);
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg w-full max-w-md sm:max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
        <input
          className="border p-2 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && email && (
          <p className="text-red-600 text-sm mb-1">Enter a valid email</p>
        )}
        <input
          type="password"
          className="border p-2 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && password && (
          <p className="text-red-600 text-sm mb-1">
            Password must be at least 6 characters
          </p>
        )}
        <button
          disabled={!isFormValid}
          className={`w-full py-2 rounded font-semibold transition-colors duration-200 ${
            isFormValid
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Register
        </button>
        <p className="mt-2 text-sm text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
