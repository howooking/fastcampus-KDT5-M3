import { Skeleton } from '@/components/ui/skeleton';

const arr = new Array(6).fill(0);

const TodoListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {arr.map((el, index) => (
        <Skeleton className="h-11 bg-primary" key={index} />
      ))}
    </div>
  );
};

export default TodoListSkeleton;
