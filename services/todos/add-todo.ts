import { ITodo } from "@/types/todo";
import db from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function addTodo(todo: ITodo) {
  const docRef = collection(db, "todo");

  return await addDoc(docRef, todo);
}
