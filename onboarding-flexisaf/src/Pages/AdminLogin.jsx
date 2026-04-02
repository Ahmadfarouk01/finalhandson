import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple hardcoded admin check
    if (form.email === "admin@uni.com" && form.password === "admin123") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        {/* Back Button */}
         <button
        onClick={() => navigate(-1)} // go back one step
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-800 text-center">Admin Login</h2>

        {/* Error Message */}
        {error && (
          <p className="bg-amber-100 text-amber-700 border border-amber-200 p-3 rounded-md text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@uni.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center">
          Use email : <strong>admin@uni.com</strong> <br></br>password : <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;