import { Link } from "react-router-dom";
import { useState } from "react";

function ApplicantsList({ applicants }) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // 1️⃣ Filter only pending applicants
  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status === "pending"
  );

  // 2️⃣ Pagination logic
  const totalPages = Math.ceil(pendingApplicants.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const paginatedApplicants = pendingApplicants.slice(
    startIndex,
    startIndex + perPage
  );

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Program</th>
            <th className="px-6 py-3 text-left">GPA</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {paginatedApplicants.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                No pending applicants
              </td>
            </tr>
          ) : (
            paginatedApplicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{applicant.name}</td>

                <td className="px-6 py-4">{applicant.program}</td>

                <td className="px-6 py-4">{applicant.gpa}</td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs bg-amber-100 text-amber-600 rounded-full">
                    {applicant.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <Link to={`/applicant/${applicant.id}`}>Review</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t">
          <button
            className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplicantsList;