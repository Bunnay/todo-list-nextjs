import db from '@/firebase';
import { Todo } from '@/types/todo';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getAllTodos(search: string): Promise<Todo[]> {
  const endpoint: string = 'todo';

  const docRef = search.trim().length
    ? query(collection(db, endpoint), where('todo', '==', search.trim()))
    : collection(db, endpoint);

  const response = await getDocs(docRef);

  const todos = response.docs.map((doc) => doc.data()) as Todo[];

  return todos;
}
