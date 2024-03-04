import { Todo } from '@/types/todo';
import Checkbox from '../ui/forms/checkbox';
import Button from '../ui/button';
import React, { Dispatch, SetStateAction } from 'react';
import { deleteTodo } from '@/app/api/todos/delete-todo';
import { markAsCompleteOrIncomplete } from '@/app/api/todos/mark-as-complete-or-incomplete';
import { toast } from 'react-toastify';

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
interface MouseEvent extends React.MouseEvent {}
interface TodoCardProps {
  todo: Todo;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<Todo>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  fetchData: () => void;
}

export default function TodoCard({
  todo,
  setLoading,
  fetchData,
  setSelectedData,
  setIsEdit,
}: TodoCardProps) {
  // Handle mark as complete
  function handleMarkAsCompleteOrIncomplete(
    id: string,
    todo: Todo,
    event: ChangeEvent
  ) {
    event.preventDefault();
    setLoading(true);
    todo.isCompleted = !todo.isCompleted;
    markAsCompleteOrIncomplete(id, todo)
      .then(() => {
        fetchData();
        todo.isCompleted
          ? toast.success('Mark todo as complete successfully!')
          : toast.success('Unmark todo as complete successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  // Handle delete
  function handleDelete(id: string, event: MouseEvent) {
    event.preventDefault();
    setLoading(true);
    deleteTodo(id)
      .then(() => {
        fetchData();
        toast.success('Delete todo successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  return (
    <div
      className="grid grid-cols-2 h-10 group items-center border border-1 rounded-md my-2"
      key={todo.id}
    >
      <div className="ml-3 flex items-center peer">
        <Checkbox
          id="isCompleted"
          name="isCompleted"
          checked={todo.isCompleted}
          onChange={(event: ChangeEvent) =>
            handleMarkAsCompleteOrIncomplete(todo.id, todo, event)
          }
          type="checkbox"
          className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <p
          className={
            todo.isCompleted ? 'ms-2 text-sm line-through' : 'ms-2 text-sm'
          }
        >
          {todo.todo}
        </p>
      </div>

      <div className="invisible group-hover:visible flex justify-end me-2">
        <Button
          type="submit"
          className="bg-orange-600"
          onClick={() => {
            setSelectedData(todo);
            setIsEdit(true);
          }}
        >
          Edit
        </Button>
        <Button
          type="submit"
          onClick={(event: MouseEvent) => handleDelete(todo.id, event)}
          className="bg-red-600 ms-2"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
