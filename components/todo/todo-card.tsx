import { ITodo } from "@/types/todo";
import Checkbox from "../ui/forms/checkbox";
import Button from "../ui/button";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { fetchApi } from "@/lib/fetch-api";
import { IBaseApiResponse, ISuccessApiResponse } from "@/types/api";

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
interface MouseEvent extends React.MouseEvent {}
interface TodoCardProps {
  todo: ITodo;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<ITodo | null>>;
  isSelected: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  fetchData: () => void;
}

export default function TodoCard({
  todo,
  setLoading,
  fetchData,
  isSelected,
  setSelectedData,
  setIsEdit,
}: TodoCardProps) {
  // Handle mark as complete
  async function handleMarkAsCompleteOrIncomplete(
    id: string,
    todo: ITodo,
    event: ChangeEvent
  ) {
    event.preventDefault();
    setLoading(true);
    todo.isCompleted = !todo.isCompleted;
    await fetchApi<ISuccessApiResponse<ITodo>>(`/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  // Handle delete
  async function handleDelete(id: string, event: MouseEvent) {
    event.preventDefault();
    setLoading(true);
    await fetchApi<IBaseApiResponse>(`/api/todo/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        fetchData();
        toast.success(data.message);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  return (
    <div
      className={
        !isSelected
          ? "grid grid-cols-2 h-10 group items-center border border-1 rounded-md my-2"
          : "grid grid-cols-2 h-10 group items-center border border-1 rounded-md my-2 bg-gray-200"
      }
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
            todo.isCompleted ? "ms-2 text-sm line-through" : "ms-2 text-sm"
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
