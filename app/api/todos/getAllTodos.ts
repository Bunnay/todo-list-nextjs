import { fetchApi } from '@/lib/fetch-api';
import { Todo } from '@/types/todo';

export async function getAllTodos(): Promise<Todo[]> {
  const endpoint: string = 'todo';

  return await fetchApi<Todo[]>(endpoint, {
    method: 'GET',
  });
}
