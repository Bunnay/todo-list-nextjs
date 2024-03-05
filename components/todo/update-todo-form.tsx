import { Todo } from "@/types/todo";
import InputField from "../ui/forms/input-field";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../ui/button";

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
interface UpdateTodoFormProps {
  formData: Todo;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isDuplicate: boolean;
  setIsDuplicate: Dispatch<SetStateAction<boolean>>;
  handleChange: (event: ChangeEvent) => void;
}

export default function UpdateTodoForm({
  formData,
  setIsEdit,
  isDuplicate,
  setIsDuplicate,
  handleChange,
}: UpdateTodoFormProps) {
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
        className="ms-2 bg-orange-600"
        disabled={!formData.todo.trim() || isDuplicate}
      >
        Save
      </Button>
      <Button
        className="ms-1 bg-gray-400"
        onClick={() => {
          setIsEdit(false), setIsDuplicate(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
