export default function filterTodos(todos: Todo[], filter: string): Todo[] {
  if (filter === 'all') {
    return todos;
  }
  if (filter === 'done') {
    return todos.filter((todo) => todo.done);
  }
  if (filter === 'not done') {
    return todos.filter((todo) => !todo.done);
  }
  return [];
}
