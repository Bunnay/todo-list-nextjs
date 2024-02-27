import { fetchApi } from '@/lib/fetch-api';
import { Todo } from '@/types/todo';

export async function createTodo(todo: Todo): Promise<Todo> {
  const endpoint: string = 'todo';

  return await fetchApi<Todo>(endpoint, {
    method: 'POST',
    body: JSON.stringify(todo),
  });
}
