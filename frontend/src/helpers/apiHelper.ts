import {
  ApiBody,
  ApiResponse,
  HttpMethod,
  RequestInit
} from '../interfaces/apiInterfaces';

export const apiCall = async <T>(
  path: string,
  method: HttpMethod,
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

  // console.log(response);
  const data = await response.json();

  if (!response.ok) {
    return { error: data.error }
  }

  return { data };
};
