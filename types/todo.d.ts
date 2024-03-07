import { Timestamp } from "firebase/firestore";

// Base Todo type
export interface ITodo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Timestamp;
}

// Add todo
export interface IAddTodo
  extends Omit<ITodo, "id" | "createdAt" | "isCompleted"> {}

// Update todo
export interface IUpdateTodo extends Omit<ITodo, "id" | "createdAt"> {}
