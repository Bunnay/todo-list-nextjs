'use client';

import TodoCard from '@/components/todo-card';
import InputField from '@/components/ui/forms/input-field';
import { Todo } from '@/types/todo';
import React, { ChangeEvent } from 'react';

export default function Home() {
  const [todo, setTodo] = React.useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('hi');
  }

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('hi');
  }

  function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('hi');
  }

  const todos: Todo[] = [
    {
      id: 'dsfsdfsdfd',
      todo: 'sfsdfsdfsd',
      isCompleted: false,
      createdAt: '',
    },
    {
      id: 'dsfssdfdfsdfd',
      todo: 'sfsdfsdfsd',
      isCompleted: false,
      createdAt: '',
    },
  ];

  return (
    <div className="m-5">
      <header className="text-center">Welcome to Todolist</header>

      <form onSubmit={handleCreate}>
        <InputField
          id="todo"
          name="todo"
          value={todo}
          onChange={handleChange}
          placeholder="Todo"
          className="my-5"
        />
      </form>

      {todo}

      <div className=" divide-y divide-gray-200 border border-gray-200 rounded-md">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}
