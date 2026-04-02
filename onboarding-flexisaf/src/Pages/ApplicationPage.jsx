import { useState } from "react";
import { useAppState } from "../context/AppStateContext";
import { createApplicant } from "../api/applicants";
import { useNavigate } from "react-router-dom";

function ApplyPage() {
  const { setApplicants } = useAppState();
    const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    program: "",
    gpa: "",
    jambScore: "",
    reason: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newApplicant = { ...form, status: "pending" };
    const savedApplicant = await createApplicant(newApplicant);

    setApplicants((prev) => [...prev, savedApplicant]);
    setSuccess(true);
    setForm({
      name: "",
      email: "",
      program: "",
      gpa: "",
      jambScore: "",
      reason: ""
    });
  };

  return (
    
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg space-y-6">
        <button
        onClick={() => navigate(-1)} // go back one step
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-slate-800 text-center">Apply for Admission</h2>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md border border-green-200 text-center">
          Application submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Program */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Program</label>
          <select
            name="program"
            value={form.program}
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select a program</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
          </select>
        </div>

        {/* GPA & JAMB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">GPA</label>
            <input
              name="gpa"
              type="number"
              step="0.01"
              value={form.gpa}
              onChange={handleChange}
              placeholder="4.0"
              className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">JAMB Score</label>
            <input
              name="jambScore"
              type="number"
              value={form.jambScore}
              onChange={handleChange}
              placeholder="250"
              className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Reason */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Reason for Applying</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Why do you want to join this program?"
            className="w-full border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyPage;