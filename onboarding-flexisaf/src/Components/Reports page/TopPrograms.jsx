import React from "react";

function TopPrograms({ applicants }) {
  const programStats = applicants.reduce((acc, applicant) => {
    const program = applicant.program || "Unknown";
    if (!acc[program]) acc[program] = { total: 0, accepted: 0 };
    acc[program].total += 1;
    if (applicant.status === "accepted") acc[program].accepted += 1;
    return acc;
  }, {});

  const programArray = Object.keys(programStats)
    .map((program) => ({
      program,
      total: programStats[program].total,
      accepted: programStats[program].accepted,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-5">
        Top 5 Programs by Applications
      </h3>
      <div className="space-y-5">
        {programArray.map((prog) => {
          const widthPercent = (prog.total / programArray[0].total) * 100;
          return (
            <div key={prog.program} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-1">
                <span className="font-medium text-slate-700">{prog.program}</span>
                <span className="text-slate-500">{prog.total} applicants</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <div className="text-xs text-green-600 font-medium">
                {prog.accepted} accepted
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopPrograms;