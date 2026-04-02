import React, { useState } from "react";
import { useAppState } from "../context/UseAppState";
import { updateApplicant } from "../api/applicants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct import

function BatchActions() {
  const { applicants, setApplicants } = useAppState();
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [cutoff, setCutoff] = useState("");
  const [batchSummary, setBatchSummary] = useState(null);
  const [lastBatchApplicants, setLastBatchApplicants] = useState([]);

  // Dynamically get unique programs
  const programs = Array.from(new Set(applicants.map((a) => a.program)));

  const handleSubmit = async () => {
    const cutoffValue = parseFloat(cutoff);
    let acceptedCount = 0;
    let rejectedCount = 0;

    // Run batch update
    const updatedApplicants = await Promise.all(
      applicants.map(async (applicant) => {
        if (applicant.program === selectedCourse) {
          let status, message;
          if (parseFloat(applicant.gpa) >= cutoffValue) {
            status = "accepted";
            message = "Congratulations! You have been accepted.";
            acceptedCount++;
          } else {
            status = "rejected";
            message =
              "Sorry, you did not meet the cutoff. Please apply next year.";
            rejectedCount++;
          }

          // Update backend
          await updateApplicant(applicant.id, { status, message });
          return { ...applicant, status, message };
        }
        return applicant;
      })
    );

    setApplicants(updatedApplicants);

    // Save only applicants affected in this batch
    const batchApplicants = updatedApplicants.filter(
      (a) => a.program === selectedCourse
    );
    setLastBatchApplicants(batchApplicants);

    setBatchSummary({
      total: acceptedCount + rejectedCount,
      accepted: acceptedCount,
      rejected: rejectedCount,
    });

    setOpen(false);
    setSelectedCourse("");
    setCutoff("");
  };

  const downloadPDF = () => {
    if (!lastBatchApplicants || lastBatchApplicants.length === 0) return;

    const doc = new jsPDF();
    let y = 10;

    // Separate accepted and rejected
    const accepted = lastBatchApplicants.filter((a) => a.status === "accepted");
    const rejected = lastBatchApplicants.filter((a) => a.status === "rejected");

    // Accepted table
    if (accepted.length > 0) {
      doc.text("Accepted Applicants", 14, y);
      y += 2;
      autoTable(doc, {
        startY: y,
        head: [["Name", "Program", "GPA"]],
        body: accepted.map((a) => [a.name, a.program, a.gpa]),
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    // Rejected table
    if (rejected.length > 0) {
      doc.text("Rejected Applicants", 14, y);
      y += 2;
      autoTable(doc, {
        startY: y,
        head: [["Name", "Program", "GPA"]],
        body: rejected.map((a) => [a.name, a.program, a.gpa]),
      });
    }

    doc.save(`Batch_${selectedCourse || "Action"}.pdf`);
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
        onClick={() => setOpen(true)}
      >
        Batch Actions
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Batch Actions</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">-- Select a course --</option>
                {programs.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Cutoff GPA</label>
              <input
                type="number"
                step="0.01"
                value={cutoff}
                onChange={(e) => setCutoff(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter cutoff GPA"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleSubmit}
                disabled={!selectedCourse || !cutoff}
              >
                Run Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {batchSummary && (
        <div className="mt-4 p-4 bg-green-100 rounded shadow-sm border border-green-200">
          <h3 className="font-bold text-lg mb-2">Batch Summary</h3>
          <p>Total Processed: {batchSummary.total}</p>
          <p>Accepted: {batchSummary.accepted}</p>
          <p>Rejected: {batchSummary.rejected}</p>

          {/* Download PDF button */}
          <button
            onClick={downloadPDF}
            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Download PDF
          </button>
        </div>
      )}
    </>
  );
}

export default BatchActions;