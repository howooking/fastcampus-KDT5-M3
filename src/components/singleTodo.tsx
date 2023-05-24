import { MdOutlineCancel, MdOutlineDragIndicator } from 'react-icons/md';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { UseMutateFunction } from 'react-query';
import timeAgo from '@/lib/timeAgo';
import { AlertDialogModal } from './alertModal';
import LengthIndicator from './lengthIndicator';

interface SingleTodoProps {
  todo: Todo;
  mutationPutTodo: UseMutateFunction<void, unknown, Todo, unknown>;
  mutationDeletTodo: UseMutateFunction<void, unknown, string, unknown>;
  isPutLoading: boolean;
}

const SingleTodo = ({
  todo,
  mutationDeletTodo,
  mutationPutTodo,
  isPutLoading,
}: SingleTodoProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodoTitle, setEditTitle] = useState(todo.title);

  // 인풋요소 더블클릭 👉 isEdit = true 👉 인풋 요소 focus
  const editTitleInputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    if (isEdit && editTitleInputRef.current) {
      editTitleInputRef.current.focus();
    }
  }, [isEdit]);

  // 인풋 외부 요소 클릭시 isEdit = false로
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !editTitleInputRef.current ||
        !editTitleInputRef.current.contains(event.target as Node)
      ) {
        setEditTitle(todo.title);
        setIsEdit(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [todo.title]);

  // ESC 누르면 isEdit = false
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditTitle(todo.title);
        setIsEdit(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [todo.title]);

  // checkbox
  const handleDone = () => {
    mutationPutTodo({ ...todo, done: !todo.done });
  };

  const handleEditTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (editTodoTitle.length < 60) {
      setEditTitle(event.target.value);
    } else {
      setEditTitle(event.target.value.slice(0, 60));
    }
  };

  // todo title 수정
  const handleEditTitle = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editTodoTitle.trim()) {
      editTitleInputRef.current.focus();
      return;
    }
    if (editTodoTitle.trim().length > 60) {
      return;
    }
    mutationPutTodo({ ...todo, title: editTodoTitle });
    setIsEdit(false);
  };

  const handleDelete = () => {
    mutationDeletTodo(todo.id);
    setIsDeleted(true);
  };

  const handleDoubleClick = () => {
    setIsEdit(true);
  };

  if (isDeleted) {
    return null;
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <input
        type="checkbox"
        disabled={isPutLoading}
        checked={todo.done}
        onChange={handleDone}
        className="h-5 w-5 hover:ring-4 hover:ring-accent focus:ring-4 focus:ring-accent"
      />

      {isEdit ? (
        <form className="relative flex-1" onSubmit={handleEditTitle}>
          <Input
            type="text"
            className={`h-11 w-full rounded-lg bg-card p-3 ring-2 ring-border placeholder:text-destructive ${
              isEdit ? 'ring-primary' : ''
            }`}
            value={editTodoTitle}
            onChange={handleEditTitleChange}
            ref={editTitleInputRef}
            placeholder="한글자 이상 작성해주세요."
          />
          <LengthIndicator textLength={editTodoTitle.trim().length} />
        </form>
      ) : (
        <div
          className="flex h-11 flex-1 select-none items-center gap-4 rounded-lg bg-card p-3 ring-1 ring-border transition duration-200 hover:ring-2 hover:ring-primary"
          onDoubleClick={handleDoubleClick}
          title={todo.title}
        >
          <MdOutlineDragIndicator
            size={25}
            className="handle cursor-pointer hover:scale-110"
          />
          <span
            className={`line-clamp-1 flex-1 ${todo.done ? 'opacity-30' : ''}`}
          >
            {todo.title}
          </span>
          <span className="text-[10px]">{timeAgo(todo.createdAt)}</span>
        </div>
      )}
      {isEdit ? (
        <MdOutlineCancel
          size={25}
          onClick={() => {
            setIsEdit(false);
            setEditTitle(todo.title);
          }}
          className="cursor-pointer hover:scale-110"
        />
      ) : (
        <AlertDialogModal
          onDelete={handleDelete}
          title={`"${todo.title}"을(를) 삭제하시겠습니까?`}
          desc={`${
            todo.done
              ? '투두를 완료하셨군요! 수고하셨습니다😁😁'
              : '투두를 완료하지 못하셨네요😥😥 다음에는 꼭 완료해 보세요'
          }`}
        />
      )}
    </div>
  );
};

export default SingleTodo;
