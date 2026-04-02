import { useState } from "react";
import ApplicantList from "../Pages/ApplicantsList";
import Filters from "../components/Filters";
import { useAppState } from "../context/UseAppState";

function Dashboard() {
  const { applicants } = useAppState();
  const [search, setSearch] = useState("");

  // Filter applicants
const filteredApplicants = applicants.filter((applicant) => {
  const searchLower = search.toLowerCase();

  return (
    applicant.name?.toLowerCase().includes(searchLower) ||
    applicant.program?.toLowerCase().includes(searchLower)
  );
});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Manage and review applicants
        </p>
      </div>

      <Filters search={search} setSearch={setSearch} />

      <ApplicantList applicants={filteredApplicants} />
    </div>
  );
}

export default Dashboard;