'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useTodos from '@/hooks/useTodos';
import LengthIndicator from './lengthIndicator';
import Loading from '@/components/loading';

const TodoInput = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { mutationPostTodo, isPostLoading } = useTodos();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (newTodoTitle.length < 60) {
      setNewTodoTitle(event.target.value);
      setMessage('');
    } else {
      setNewTodoTitle(event.target.value.slice(0, 60));
      setMessage('60글자 이하로 적어주세요');
    }
  };

  const newTodoInputRef = useRef<HTMLInputElement>(null!);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 이전 타임아웃이 아직 작동중이면 없에버리기
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    // 값을 입력하지 않고 전송할 경우
    if (!newTodoTitle.trim()) {
      newTodoInputRef.current.focus();
      setMessage('값을 입력해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    // 60글자가 넘는 경우
    if (newTodoTitle.trim().length > 60) {
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    // POST 요청
    mutationPostTodo(newTodoTitle.trim());
    // 입력창 초기화
    setNewTodoTitle('');
    setMessage('');
  };

  // placeholder 안내
  const helpers = [
    '새로운 TODO를 입력해 주세요',
    'TODO항목을 더블클릭하면 TODO를 수정할 수 있습니다',
  ];

  const [currentHelperIndex, setCurrentHelperIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHelperIndex((prev) => (prev + 1) % helpers.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [helpers.length]);

  return (
    <div className="relative">
      <form className="flex w-full items-center gap-3" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder={helpers[currentHelperIndex]}
            ref={newTodoInputRef}
            value={newTodoTitle}
            onChange={handleChange}
            disabled={isPostLoading}
          />
          <LengthIndicator textLength={newTodoTitle.trim().length} />
        </div>
        <Button
          type="submit"
          disabled={isPostLoading}
          className="w-1/5 hover:bg-accent"
        >
          {isPostLoading ? <Loading size={20} /> : 'SUBMIT'}
        </Button>
      </form>
      <div className="absolute -bottom-6 left-3 text-xs text-destructive">
        {message}
      </div>
    </div>
  );
};

export default TodoInput;
