import clsx from 'clsx';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  total: number;
};

export default function StatsBar({ activeCount, completedCount, total }: StatsBarProps) {
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="mb-6 bg-[#1e1e2e] rounded-2xl p-4 flex items-center gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#94a3b8]">Progress</span>
          <span className="text-sm font-semibold text-[#6366f1]">{progress}%</span>
        </div>
        <div className="h-2 bg-[#2a2a3e] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6366f1] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex gap-4 shrink-0">
        <Stat label="Total" value={total} color="text-white" />
        <Stat label="Active" value={activeCount} color="text-[#a5b4fc]" />
        <Stat label="Done" value={completedCount} color="text-[#34d399]" />
      </div>
    </div>
  );
}

type StatProps = { label: string; value: number; color: string };

function Stat({ label, value, color }: StatProps) {
  return (
    <div className="text-center">
      <div className={clsx('text-xl font-bold', color)}>{value}</div>
      <div className="text-xs text-[#94a3b8]">{label}</div>
    </div>
  );
}
