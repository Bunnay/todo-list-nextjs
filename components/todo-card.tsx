import { Todo } from '@/types/todo';

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div key={todo.id} className="relative flex items-start p-4">
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label
          htmlFor={`person-${todo.id}`}
          className="select-none font-medium"
        >
          {todo.todo}
        </label>
      </div>

      <div className="ml-3 flex h-6 items-center">
        <input
          id={`person-${todo.id}`}
          name={`person-${todo.id}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  );
}
