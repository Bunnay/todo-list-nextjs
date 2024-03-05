import { Todo } from "@/types/todo";
import InputField from "../ui/forms/input-field";
import React from "react";
import Button from "../ui/button";

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
interface AddTodoFormProps {
  formData: Todo;
  isDuplicate: boolean;
  handleChange: (event: ChangeEvent) => void;
}

export default function AddTodoForm({
  formData,
  isDuplicate,
  handleChange,
}: AddTodoFormProps) {
  return (
    <div>
      <InputField
        id="todo"
        name="todo"
        value={formData.todo}
        onChange={handleChange}
        placeholder="Write here..."
        autoFocus={true}
      />

      <Button
        type="submit"
        className="ms-2"
        disabled={!formData.todo.trim() || isDuplicate}
      >
        Add
      </Button>
    </div>
  );
}
