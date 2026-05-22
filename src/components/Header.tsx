import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-[#6366f1] flex items-center justify-center shadow-lg">
        <CheckSquare className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">My Todos</h1>
        <p className="text-sm text-[#94a3b8]">Stay organized and productive</p>
      </div>
    </div>
  );
}
