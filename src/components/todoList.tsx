'use client';

import { ReactSortable, Sortable } from 'react-sortablejs';
import SingleTodo from '@/components/singleTodo';
import useTodos from '@/hooks/useTodos';
import { deleteDone, reorderTodo } from '@/api/requests';
import { useState } from 'react';
import TodosFilter from '@/components/todosFilter';
import TodoListSkeleton from '@/components/todoListSkeleton';
import filterTodos from '@/lib/filterTodos';

export default function TodoList() {
  const {
    isLoading,
    clientTodos,
    setClientTodos,
    mutationPutTodo,
    mutationDeletTodo,
    isPutLoading,
  } = useTodos();

  // all, not done, done 필터
  const [filter, setFilter] = useState<'all' | 'not done' | 'done'>('all');
  const handleFilter = (filter: Filter['label']) => {
    setFilter(filter);
  };

  // 완료 투두 모두 삭제
  const handleDeleteDone = () => {
    setClientTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
    deleteDone(clientTodos.filter((todo) => todo.done).map((todo) => todo.id));
  };

  // 순서 변경
  const todoIds = clientTodos.map((todo) => todo.id);
  const handleReorder = (event: Sortable.SortableEvent) => {
    // 이동 전 index의 아이템을 splice 매서드를 이용하여 변수에 담음
    const item = todoIds.splice(event.oldIndex as number, 1)[0];
    // 이동 후 index에 해당 아이템을 넣음
    todoIds.splice(event.newIndex as number, 0, item);
    reorderTodo(todoIds);
  };
  // 필터링 된 투두
  const filteredTodos = filterTodos(clientTodos, filter);

  return (
    <div className="mt-7 flex flex-1 flex-col overflow-auto rounded-lg bg-muted shadow-md">
      <TodosFilter
        handleFilter={handleFilter}
        filter={filter}
        handleDeleteDone={handleDeleteDone}
        clientTodos={clientTodos}
      />
      {isLoading ? (
        <TodoListSkeleton />
      ) : (
        <ReactSortable
          list={filteredTodos}
          setList={setClientTodos}
          className="flex flex-col gap-3 p-4 "
          animation={250}
          handle=".handle"
          onEnd={handleReorder}
        >
          {filteredTodos.map((todo: Todo) => (
            <SingleTodo
              todo={todo}
              key={todo.id}
              mutationPutTodo={mutationPutTodo}
              mutationDeletTodo={mutationDeletTodo}
              isPutLoading={isPutLoading}
            />
          ))}
        </ReactSortable>
      )}
    </div>
  );
}
