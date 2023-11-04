export interface ApiBody {
  email?: string;
  name?: string;
  age?: number;
  isAdmin?: boolean;
  // add more when needed.
}

export interface ApiResponse<T> {
  data?: T;
}
