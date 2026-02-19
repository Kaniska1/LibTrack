"use client";

import { useState } from "react";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Auth failed");
      onAuth(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4 p-6 bg-card rounded-xl border">
        <h2 className="text-lg font-bold text-center mb-2">{mode === "login" ? "Login" : "Register"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded bg-primary text-white font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
        </button>
        <div className="text-xs text-center mt-2">
          {mode === "login" ? (
            <span>
              Don't have an account?{' '}
              <button type="button" className="underline" onClick={() => setMode("register")}>Register</button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" className="underline" onClick={() => setMode("login")}>Login</button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
