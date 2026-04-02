function ProgressBar({ label, value, percent, color = "blue" }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="text-slate-500">
          {value} <span className="text-xs">({percent}%)</span>
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`bg-${color}-500 h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;