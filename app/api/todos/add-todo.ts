import { Todo } from '@/types/todo';
import db from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

export async function addTodo(todo: Todo) {
  const endpoint: string = 'todo';

  const docRef = collection(db, endpoint);

  return await addDoc(docRef, todo);
}
