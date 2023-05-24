import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { MdDeleteOutline } from 'react-icons/md';

interface AlertDialogModalProps {
  title: string;
  desc: string;
  onDelete: () => void;
  isDoneDelete?: boolean;
}

export function AlertDialogModal({
  onDelete,
  title,
  desc,
  isDoneDelete,
}: AlertDialogModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isDoneDelete ? (
          <Button variant="destructive" size="sm">
            DELETE ALL
          </Button>
        ) : (
          <MdDeleteOutline
            size={25}
            className="cursor-pointer hover:scale-110"
          />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-secondary">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/70"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
