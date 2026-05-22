import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const todoData = useTodos();

  return (
    <div className="min-h-screen bg-[#13131f]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Header />
        <StatsBar
          activeCount={todoData.activeCount}
          completedCount={todoData.completedCount}
          total={todoData.todos.length}
        />
        <AddTodoForm onAdd={todoData.addTodo} />
        <FilterBar
          filter={todoData.filter}
          setFilter={todoData.setFilter}
          searchQuery={todoData.searchQuery}
          setSearchQuery={todoData.setSearchQuery}
          categoryFilter={todoData.categoryFilter}
          setCategoryFilter={todoData.setCategoryFilter}
          categories={todoData.categories}
          onClearCompleted={todoData.clearCompleted}
          completedCount={todoData.completedCount}
        />
        <TodoList
          todos={todoData.filtered}
          onToggle={todoData.toggleTodo}
          onDelete={todoData.deleteTodo}
          onEdit={todoData.editTodo}
        />
      </div>
    </div>
  );
}
