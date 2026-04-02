import { useParams } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { updateApplicant } from "../api/applicants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReviewPage() {
  const { id } = useParams();
  const { applicants, setApplicants } = useAppState();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
    const navigate = useNavigate();

  const applicant = applicants.find((a) => String(a.id) === id);

  if (!applicant) return <p>Loading...</p>;

  const handleDecision = async (status) => {
    if (loading) return; // prevent multiple clicks at the same time
    setLoading(true);
    setSuccess("");

    try {
      const updated = await updateApplicant(applicant.id, {
        ...applicant,
        status,
        notes,
      });

      setApplicants((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );

      setSuccess(`Application status updated to "${status}".`);
    } catch (err) {
      console.error("Error updating applicant:", err);
    } finally {
      setLoading(false);
    }
  };

  // Determine button styles dynamically
  const getButtonStyle = (buttonStatus) => {
    const isCurrent = applicant.status === buttonStatus;
    if (buttonStatus === "accepted") {
      return `px-4 py-2 rounded-md transition ${
        isCurrent ? "bg-emerald-700 text-white" : "bg-emerald-600 text-white hover:bg-emerald-700"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`;
    } else {
      // rejected button
      return `px-4 py-2 border rounded-md transition ${
        isCurrent
          ? "bg-amber-500 text-white border-amber-500"
          : "border-amber-500 text-amber-700 hover:bg-amber-100"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md space-y-6 border border-slate-200">
        <button
        onClick={() => navigate(-1)} // go back one step
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>
      <h3 className="text-2xl font-semibold text-slate-800">Review Applicant</h3>
      <p className="text-sm text-slate-500">
        Use this panel to add feedback notes and update the applicant's status.
      </p>

      <div className="space-y-1">
        <p className="font-medium text-lg">{applicant.name}</p>
        <p className="text-sm text-slate-500">
          Program: {applicant.program || "N/A"}
        </p>
        <p className="text-sm text-slate-500">
          JAMB Score: {applicant.jambScore || "Not provided"}
        </p>
        <p className="text-sm text-slate-500">
          GPA: {applicant.gpa || "Not provided"}
        </p>
      </div>

      <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-sm">
        <strong>Reason for Applying:</strong>{" "}
        {applicant.reason || "No reason provided"}
      </div>

      <textarea
        placeholder="Add feedback notes here..."
        className="w-full h-28 border border-slate-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={loading}
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleDecision("rejected")}
          className={getButtonStyle("rejected")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reject"}
        </button>
        <button
          onClick={() => handleDecision("accepted")}
          className={getButtonStyle("accepted")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Accept"}
        </button>
      </div>

      {success && (
        <p className="text-green-700 bg-green-100 p-3 rounded-md border border-green-200 text-center">
          {success}
        </p>
      )}
    </div>
  );
}

export default ReviewPage;