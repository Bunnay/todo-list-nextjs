// Base Todo type
export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
}

// Create todo type extend from base todo
export interface CreateTodo
  extends Omit<Todo, 'id' | 'createdAt' | 'isCompleted'> {}

// Update todo type extend from base todo
export interface UpdateTodo extends Omit<Todo, 'id' | 'createdAt'> {}

// Todo type in error response
export interface ErrorTodo {
  todo: string[];
  isCompleted: string[];
}
