import db from "@/firebase";
import { IUpdateTodo } from "@/types/todo";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function markAsCompleteOrIncomplete(
  id: string,
  todo: IUpdateTodo
) {
  const q = query(collection(db, "todo"), where("id", "==", id));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw Error();
  }

  const docRef = doc(db, "todo", querySnapshot.docs[0].id);

  return await updateDoc(docRef, todo);
}
