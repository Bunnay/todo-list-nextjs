import { fetchApi } from '@/lib/fetch-api';
import { Todo } from '@/types/todo';

export async function deleteTodo(id: string): Promise<Todo> {
  const endpoint: string = `todo/${id}`;

  return await fetchApi<Todo>(endpoint, {
    method: 'DELETE',
  });
}
