import { Search, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: FilterType[] = ['all', 'active', 'completed'];

export default function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="mb-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-[#1e1e2e] text-white placeholder-[#94a3b8] rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#6366f1] text-sm transition"
        />
      </div>

      {/* Filter tabs + category + clear */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex bg-[#1e1e2e] rounded-xl p-1 gap-1">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition',
                filter === f
                  ? 'bg-[#6366f1] text-white shadow'
                  : 'text-[#94a3b8] hover:text-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {categories.length > 1 && (
          <select
            value={categoryFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
            className="bg-[#1e1e2e] text-[#94a3b8] rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#6366f1] border-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        )}

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="ml-auto flex items-center gap-1.5 text-xs text-[#f87171] hover:text-red-400 transition px-3 py-2 rounded-xl hover:bg-[#f87171]/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear {completedCount} done
          </button>
        )}
      </div>
    </div>
  );
}
