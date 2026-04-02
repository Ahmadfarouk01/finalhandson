import ProgressBar from "./ProgressBar";

function StatusBreakdown() {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-5">
        Application Status Breakdown
      </h3>
      <div className="space-y-5">
        <ProgressBar label="Pending" value={214} percent={63} color="amber" />
        <ProgressBar label="Shortlisted" value={128} percent={37} color="blue" />
        <ProgressBar label="Accepted" value={87} percent={25} color="green" />
        <ProgressBar label="Rejected" value={41} percent={12} color="red" />
      </div>
    </div>
  );
}

export default StatusBreakdown;