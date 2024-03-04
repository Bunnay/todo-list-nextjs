import db from '@/firebase';
import {
  deleteDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';

export async function deleteTodo(id: string) {
  const endpoint: string = 'todo';

  const q = query(collection(db, endpoint), where('id', '==', id));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw Error();
  }

  const docRef = doc(db, endpoint, querySnapshot.docs[0].id);

  return await deleteDoc(docRef);
}
