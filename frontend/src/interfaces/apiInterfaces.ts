export interface ApiBody {
  email?: string;
  name?: string;
  age?: number;
  isAdmin?: boolean;
  // add more when needed.
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
