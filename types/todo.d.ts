import { Timestamp } from 'firebase/firestore';

// Base Todo type
export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Timestamp;
}

// Add todo
export interface AddTodo
  extends Omit<Todo, 'id' | 'createdAt' | 'isCompleted'> {}

// Update todo
export interface UpdateTodo extends Omit<Todo, 'id' | 'createdAt'> {}
