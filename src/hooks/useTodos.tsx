import { deleteTodo, getTodos, postTodo, putTodo } from '@/api/requests';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function useTodos() {
  const [clientTodos, setClientTodos] = useState<Todo[]>([]);
  const queryClient = useQueryClient();

  const { data: serverTodos, isLoading } = useQuery({
    queryFn: getTodos,
    queryKey: ['todos'],
    onSuccess: (data) => {
      setClientTodos(data);
    },
    onError: (err) => console.log(err),
  });

  const { mutate: mutationPostTodo, isLoading: isPostLoading } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    onError: (err) => console.log(err),
  });

  const { mutate: mutationDeletTodo, isLoading: isDeleteLoading } = useMutation(
    {
      mutationFn: deleteTodo,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
      onError: (err) => console.log(err),
    }
  );

  const { mutate: mutationPutTodo, isLoading: isPutLoading } = useMutation({
    mutationFn: putTodo,
    onSuccess: (data, updatedTodo) => {
      setClientTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      }, 300);
    },
    onError: (err) => console.log(err),
  });

  return {
    serverTodos,
    isLoading,
    clientTodos,
    setClientTodos,
    mutationPostTodo,
    isPostLoading,
    mutationDeletTodo,
    isDeleteLoading,
    mutationPutTodo,
    isPutLoading,
  };
}
