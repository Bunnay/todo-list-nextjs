import config from "@/config";

export async function fetchApi<T>(
  endpoint: string,
  fetchOptions?: RequestInit
): Promise<T> {
  // Format url
  const url = new URL(`${config.environment.apiUrl}${endpoint}`).href;

  // Fetch and return
  return await fetch(url, {
    ...fetchOptions,
  })
    .then((response) => response.json())
    .then((data: T) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
