import { Todo } from "@/types/todo";
import db from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function addTodo(todo: Todo) {
  const docRef = collection(db, "todo");

  return await addDoc(docRef, todo);
}
