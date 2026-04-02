import ReportsCharts from "../Components/Reports page/Charts";
import PageHeader from "../Components/Reports page/PageHeader";
import TopPrograms from "../components/Reports page/TopPrograms";
import { useAppState } from "../context/UseAppState";

function Reports() {
  const { applicants } = useAppState();

  const totalApplications = applicants.length;
  const accepted = applicants.filter(a => a.status === "accepted");
  const rejected = applicants.filter(a => a.status === "rejected");
  const pending = applicants.filter(a => a.status === "pending");

  const acceptanceRate =
    totalApplications > 0
      ? ((accepted.length / totalApplications) * 100).toFixed(1)
      : 0;

  const stats = [
    { title: "Total Applications", value: totalApplications, color: "text-slate-900", subtitle: "This session" },
    { title: "Accepted", value: accepted.length, color: "text-green-600", subtitle: "Admitted students" },
    { title: "Rejected", value: rejected.length, color: "text-red-600", subtitle: "Rejected students" },
    { title: "Pending Review", value: pending.length, color: "text-amber-600", subtitle: "Requires attention" },
    { title: "Acceptance Rate", value: `${acceptanceRate}%`, color: "text-slate-800", subtitle: "Overall success rate" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader />

      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.slice(0, 4).map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col"
          >
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{item.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-400 mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.slice(4).map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col"
          >
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{item.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-400 mt-1">{item.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <ReportsCharts applicants={applicants} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopPrograms applicants={applicants} />
      </div>
    </div>
  );
}

export default Reports;