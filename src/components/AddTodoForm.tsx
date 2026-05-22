import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

const priorityColors: Record<Priority, string> = {
  low: 'text-[#34d399] bg-[#34d399]/10 border-[#34d399]/30',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  high: 'text-[#f87171] bg-[#f87171]/10 border-[#f87171]/30',
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 bg-[#1e1e2e] rounded-2xl p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-[#2a2a3e] text-white placeholder-[#94a3b8] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6366f1] text-sm transition"
        />
        <button
          type="button"
          onClick={() => setExpanded(p => !p)}
          className="p-3 rounded-xl bg-[#2a2a3e] text-[#94a3b8] hover:text-white transition"
        >
          <ChevronDown className={clsx('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
        </button>
        <button
          type="submit"
          className="p-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white transition shadow"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {expanded && (
        <div className="mt-3 flex flex-wrap gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-xs text-[#94a3b8]">Priority:</span>
            {PRIORITIES.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={clsx(
                  'px-3 py-1 rounded-lg text-xs border capitalize transition',
                  priorityColors[p],
                  priority === p ? 'ring-2 ring-offset-1 ring-offset-[#1e1e2e] ring-current' : 'opacity-60 hover:opacity-100'
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            placeholder="Category (e.g. Work)"
            className="flex-1 min-w-[140px] bg-[#2a2a3e] text-white placeholder-[#94a3b8] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#6366f1] text-xs transition"
          />
        </div>
      )}
    </form>
  );
}
