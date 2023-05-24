import { IconType } from 'react-icons';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import { VscChecklist } from 'react-icons/vsc';
import { Button } from '@/components/ui/button';
import filterTodos from '@/lib/filterTodos';
import { AlertDialogModal } from '@/components/alertModal';

const filters: Filter[] = [
  { label: 'all', icon: VscChecklist },
  { label: 'not done', icon: ImCheckboxUnchecked },
  { label: 'done', icon: ImCheckboxChecked },
];

interface TodoFilterProps {
  handleFilter: (filter: Filter['label']) => void;
  filter: string;
  handleDeleteDone: () => void;
  clientTodos: Todo[];
}

const TodosFilter = ({
  handleFilter,
  filter,
  handleDeleteDone,
  clientTodos,
}: TodoFilterProps) => {
  const doneTodoLength = filterTodos(clientTodos, 'done').length;

  return (
    <div className="flex items-center p-4 shadow-sm">
      <ul className="flex flex-1 gap-3">
        {filters.map((fil) => {
          const todoLength = filterTodos(clientTodos, fil.label).length;
          return (
            <li key={fil.label}>
              <Button
                className={`flex items-center gap-2 ${
                  fil.label === filter ? 'ring-4 ring-accent' : ''
                }`}
                size="sm"
                onClick={() => handleFilter(fil.label)}
              >
                <fil.icon />
                {fil.label.toUpperCase()}
                <div>{todoLength}</div>
              </Button>
            </li>
          );
        })}
      </ul>
      {filter === 'done' && doneTodoLength ? (
        <AlertDialogModal
          onDelete={handleDeleteDone}
          title={`${doneTodoLength}개의 완료된 투두를 삭제하시겠습니까?`}
          desc="수고하셨습니다!!😁😁"
          isDoneDelete
        />
      ) : null}
    </div>
  );
};

export default TodosFilter;
