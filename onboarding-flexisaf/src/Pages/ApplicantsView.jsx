import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

function CheckStatusPage() {
  const { applicants } = useAppState();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!email.trim()) return; // prevent empty search

    setLoading(true);
    setTimeout(() => {
      const found = applicants.find(
        (a) => a.email.toLowerCase() === email.toLowerCase()
      );
      setApplicant(found || null);
      setLoading(false);
    }, 400); // simulate loading for UX
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg space-y-6">
      {/* Back button */}
     <button
        onClick={() => navigate(-1)} // go back one step
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-slate-800 text-center">
        Check Admission Status
      </h2>

      {/* Search form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex gap-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-slate-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded-md hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {/* Result */}
      {applicant ? (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm">
          <p><strong>Name:</strong> {applicant.name}</p>
          <p><strong>Program:</strong> {applicant.program}</p>
          <p><strong>GPA:</strong> {applicant.gpa}</p>
          <p><strong>JAMB Score:</strong> {applicant.jambScore}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(applicant.status)}`}>
              {applicant.status}
            </span>
          </p>
          {applicant.notes && (
            <p><strong>Reviewer Feedback:</strong> {applicant.notes}</p>
          )}
        </div>
      ) : email && !loading ? (
        <p className="mt-6 text-red-600 text-center">No applicant found with this email.</p>
      ) : null}
    </div>
  );
}

export default CheckStatusPage;