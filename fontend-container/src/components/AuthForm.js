import React, { useState } from "react";

export default function AuthForm({ mode, onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Email & Password required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-80 mx-auto mt-20">
      <h2 className="text-xl font-bold text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}
