"use client";

import TodoCard from "@/components/todo/todo-card";
import { ITodo } from "@/types/todo";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NoData from "@/components/ui/no-data";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import AddTodoForm from "@/components/todo/add-todo-form";
import UpdateTodoForm from "@/components/todo/update-todo-form";
import SearchTodoForm from "@/components/todo/search-form";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { fetchApi } from "@/lib/fetch-api";
import { ISuccessApiResponse } from "@/types/api";

interface FormEvent extends React.FormEvent<HTMLFormElement> {}
interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

export default function Home() {
  // Default todo data
  const getNewTodo = (): ITodo => ({
    id: uuidv4(),
    todo: "",
    isCompleted: false,
    createdAt: Timestamp?.now(),
  });

  const newTodo = getNewTodo();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [formData, setFormData] = React.useState<ITodo>(newTodo);
  const [selectedData, setSelectedData] = React.useState<ITodo | null>(null);
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Handle change form data
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;

    // Check duplicate todo
    handleDuplicateTodo(value.trim());

    // Set new value to data
    !isEdit
      ? setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }))
      : setSelectedData((prevFormData) =>
          prevFormData
            ? {
                ...prevFormData,
                [name]: value,
              }
            : null
        );
  };

  // Handle duplicate todo
  const handleDuplicateTodo = (value: string) => {
    const isDup = todos.some(
      (todo: ITodo) => todo.todo.toLowerCase() == value.toLowerCase()
    );
    setIsDuplicate(isDup);
  };

  // Handle add new todo
  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    await fetchApi<ISuccessApiResponse<ITodo>>("/api/todo", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((data) => {
        fetchData();
        setFormData(newTodo);
        toast.success(data.message);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  // Handle update
  async function handleUpdate(id: string, event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    await fetchApi<ISuccessApiResponse<ITodo>>(`/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify(selectedData),
    })
      .then((data) => {
        fetchData();
        setFormData(newTodo);
        setIsEdit(false);
        toast.success(data.message);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  // fetch data function
  const fetchData = async () => {
    const endpoint = search ? `/api/todo?search=${search}` : "/api/todo";
    setLoading(true);
    await fetchApi<ITodo[]>(endpoint).then((data) => {
      setTodos(data);
    });
    setLoading(false);
  };

  // fetch data after renderd and search
  useEffect(() => {
    // set timer for debounce
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="m-5">
      {/* Header */}
      <header className="text-center mb-5">Welcome to Todo List</header>

      {/* Search field */}
      <SearchTodoForm search={search} setSearch={setSearch} />

      {/* Todo lists */}
      {loading ? (
        <LoadingSkeleton />
      ) : !todos.length ? (
        <NoData />
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoCard
              todo={todo}
              isSelected={todo.id === selectedData?.id}
              setLoading={setLoading}
              setSelectedData={setSelectedData}
              setIsEdit={setIsEdit}
              fetchData={fetchData}
              key={todo.id}
            />
          ))}
        </div>
      )}

      {/* Todo form */}
      <form
        onSubmit={(event: FormEvent) => {
          isEdit
            ? handleUpdate(selectedData?.id || "", event)
            : handleAdd(event);
          setSelectedData(null);
        }}
        className="mb-5"
      >
        {!isEdit ? (
          // Add todo form
          <AddTodoForm
            formData={formData}
            isDuplicate={isDuplicate}
            handleChange={(event: ChangeEvent) => handleChange(event)}
          />
        ) : (
          // Update todo form
          <UpdateTodoForm
            formData={selectedData}
            setIsEdit={setIsEdit}
            setFormData={setSelectedData}
            isDuplicate={isDuplicate}
            setIsDuplicate={setIsDuplicate}
            handleChange={(event: ChangeEvent) => handleChange(event)}
          />
        )}

        {/* Error alert when duplicate todo */}
        {isDuplicate && (
          <small className="text-sm text-red-600">
            This todo is already exist!
          </small>
        )}
      </form>
    </div>
  );
}
