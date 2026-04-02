import { useAppState } from "../context/AppStateContext";

function ApplicantsPortal() {
  const { applicants } = useAppState();

  // for now just show first applicant
  const applicant = applicants[0];

  if (!applicant) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">
        Applicant Portal
      </h3>

      <div>
        <p className="text-sm text-slate-500">Applicant</p>
        <p className="text-sm text-slate-700">{applicant.name}</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Application Status</p>
        <span className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
          {applicant.status}
        </span>
      </div>
    </div>
  );
}

export default ApplicantsPortal;