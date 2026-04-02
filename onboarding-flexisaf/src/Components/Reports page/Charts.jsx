import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ReportsCharts({ applicants }) {
  const statusCounts = applicants.reduce(
    (acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    },
    { accepted: 0, rejected: 0, pending: 0 },
  );

  const statusData = [
    { name: "Accepted", value: statusCounts.accepted || 0, color: "#16a34a" },
    { name: "Rejected", value: statusCounts.rejected || 0, color: "#dc2626" },
    { name: "Pending", value: statusCounts.pending || 0, color: "#f59e0b" },
  ];
  const COLORS = statusData.map((d) => d.color);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie chart: Status Breakdown */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm w-full">
        <h3 className="text-sm font-medium text-slate-500 uppercase mb-4">
          Status Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name} (${entry.value})`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReportsCharts;
