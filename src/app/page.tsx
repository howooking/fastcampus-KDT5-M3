export const runtime = 'edge'; // nodejs 말고 edge 런타임

import TodoInput from '@/components/todoInput';
import TodoList from '@/components/todoList';
import QueryClientContext from '@/context/QueryClientProvider';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col p-8">
      <QueryClientContext>
        <TodoInput />
        <TodoList />
      </QueryClientContext>
    </main>
  );
}
