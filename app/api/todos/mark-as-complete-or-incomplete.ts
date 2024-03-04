import db from '@/firebase';
import { UpdateTodo } from '@/types/todo';
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export async function markAsCompleteOrIncomplete(id: string, todo: UpdateTodo) {
  const endpoint: string = 'todo';

  const q = query(collection(db, endpoint), where('id', '==', id));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw Error();
  }

  const docRef = doc(db, endpoint, querySnapshot.docs[0].id);

  return await updateDoc(docRef, todo);
}
