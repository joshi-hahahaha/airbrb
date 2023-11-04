import { ApiBody, ApiResponse } from '../interfaces/apiInterfaces';

export const apiCall = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: ApiBody | null,
  token: string | null,
  queryString: string | undefined
): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    'Content-type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(
    `http://localhost:5005${path}${queryString ? `?${queryString}` : ''}`,
    config
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }

  return data as ApiResponse<T>;
};
