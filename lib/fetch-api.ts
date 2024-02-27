import config from '@/config';

export async function fetchApi<T>(
  endpoint: string,
  fetchOptions?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${config.environment.apiUrl}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    });

    const body = await response.json();

    return body;
  } catch (error) {
    throw error;
  }
}
