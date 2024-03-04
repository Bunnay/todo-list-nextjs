import { UpdateTodo } from "@/types/todo";
import db from "@/firebase";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

export async function updateTodo(id: string, todo: UpdateTodo) {
  const q = query(collection(db, "todo"), where("id", "==", id));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw Error();
  }

  const docRef = doc(db, "todo", querySnapshot.docs[0].id);

  return await updateDoc(docRef, todo);
}
