'use client';

import TodoCard from '@/components/todo/todo-card';
import { Todo } from '@/types/todo';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from './api/todos/add-todo';
import { getAllTodos } from './api/todos/get-all-todos';
import { updateTodo } from './api/todos/update-todo';
import NoData from '@/components/ui/no-data';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import AddTodoForm from '@/components/todo/add-todo-form';
import UpdateTodoForm from '@/components/todo/update-todo-form';
import SearchTodoForm from '@/components/todo/search-form';
import { toast } from 'react-toastify';
import { Timestamp } from 'firebase/firestore';

interface FormEvent extends React.FormEvent<HTMLFormElement> {}
interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

export default function Home() {
  // Default todo data
  const getNewTodo = (): Todo => ({
    id: uuidv4(),
    todo: '',
    isCompleted: false,
    createdAt: Timestamp?.now(),
  });

  const newTodo = getNewTodo();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [formData, setFormData] = React.useState<Todo>(newTodo);
  const [selectedData, setSelectedData] = React.useState<Todo>(newTodo);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Handle change form data
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;

    // Check duplicate todo
    handleDuplicateTodo(value);

    // Set new value to data
    !isEdit
      ? setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }))
      : setSelectedData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
  };

  // Handle duplicate todo
  const handleDuplicateTodo = (value: string) => {
    const isDup = todos.some(
      (todo: Todo) => todo.todo.toLowerCase() == value.toLowerCase()
    );
    setIsDuplicate(isDup);
  };

  // Handle add new
  function handleAdd(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    addTodo(formData)
      .then(() => {
        fetchData();
        setFormData(newTodo);
        toast.success('Add todo successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  // Handle update
  function handleUpdate(id: string, event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    updateTodo(id, selectedData)
      .then(() => {
        fetchData();
        setFormData(newTodo);
        setIsEdit(false);
        toast.success('Update todo successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  // fetch data function
  const fetchData = async () => {
    setLoading(true);
    const todosData = await getAllTodos(search);
    setTodos(todosData);
    setLoading(false);
  };

  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  // fetch data on search
  useEffect(() => {
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
        onSubmit={(event: FormEvent) =>
          isEdit ? handleUpdate(selectedData.id, event) : handleAdd(event)
        }
        className="mb-5"
      >
        {!isEdit ? (
          <AddTodoForm
            formData={formData}
            isDuplicate={isDuplicate}
            handleChange={(event: ChangeEvent) => handleChange(event)}
          />
        ) : (
          <UpdateTodoForm
            formData={selectedData}
            setIsEdit={setIsEdit}
            isDuplicate={isDuplicate}
            setIsDuplicate={setIsDuplicate}
            handleChange={(event: ChangeEvent) => handleChange(event)}
          />
        )}

        {isDuplicate && (
          <small className="text-xs text-red-600">
            This todo is already exist!
          </small>
        )}
      </form>
    </div>
  );
}
