import { fetchApi } from '@/lib/fetch-api';
import { Todo } from '@/types/todo';

export async function updateTodo(id: string, todo: Todo): Promise<Todo> {
  const endpoint: string = `todo/${id}`;

  return await fetchApi<Todo>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(todo),
  });
}
