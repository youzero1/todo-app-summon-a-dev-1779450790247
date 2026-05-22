import { useState, useEffect } from 'react';
import { Todo, Priority, FilterType } from '@/types';

const STORAGE_KEY = 'todos_app_data';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch (e: any) {
    console.error('Failed to load todos:', e.message);
  }
  return [];
}

function saveToStorage(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e: any) {
    console.error('Failed to save todos:', e.message);
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority, category: string): void {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
      category: category.trim() || 'General',
    };
    setTodos(prev => [newTodo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  function deleteTodo(id: string): void {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function editTodo(id: string, text: string): void {
    if (!text.trim()) return;
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, text: text.trim() } : t)
    );
  }

  function clearCompleted(): void {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  const categories = ['all', ...Array.from(new Set(todos.map(t => t.category)))];

  const filtered = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ? true :
      filter === 'active' ? !todo.completed :
      todo.completed;

    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ? true : todo.category === categoryFilter;

    return matchesFilter && matchesSearch && matchesCategory;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return {
    todos,
    filtered,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  };
}
