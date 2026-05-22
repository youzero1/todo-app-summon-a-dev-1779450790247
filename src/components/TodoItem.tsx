import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo, Priority } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityDot: Record<Priority, string> = {
  low: 'bg-[#34d399]',
  medium: 'bg-yellow-400',
  high: 'bg-[#f87171]',
};

const priorityBorder: Record<Priority, string> = {
  low: 'border-l-[#34d399]/40',
  medium: 'border-l-yellow-400/40',
  high: 'border-l-[#f87171]/40',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  function handleSave(): void {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleCancel(): void {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 bg-[#1e1e2e] rounded-2xl px-4 py-3 border-l-4 transition-all hover:bg-[#2a2a3e]',
        priorityBorder[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-[#6366f1] border-[#6366f1]'
            : 'border-[#313148] hover:border-[#6366f1]'
        )}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#2a2a3e] text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        ) : (
          <span
            className={clsx(
              'text-sm block truncate',
              todo.completed ? 'line-through text-[#94a3b8]' : 'text-white'
            )}
          >
            {todo.text}
          </span>
        )}
        <div className="flex items-center gap-2 mt-0.5">
          <span className={clsx('w-1.5 h-1.5 rounded-full', priorityDot[todo.priority])} />
          <span className="text-xs text-[#94a3b8]">{todo.category}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-[#34d399] hover:bg-[#34d399]/10 transition"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:bg-[#313148] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#a5b4fc] hover:bg-[#313148] transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#f87171] hover:bg-[#f87171]/10 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
