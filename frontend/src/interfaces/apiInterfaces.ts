import { Address, Availability, Metadata, Review } from './listingInterfaces';

export interface ApiBody {
  email?: string;
  name?: string;
  age?: number;
  isAdmin?: boolean;

  // Listings
  id?: number;
  title?: string;
  address?: Address;
  thumbnail?: string;
  price?: number;
  reviews?: Review[];
  owner?: string;
  metadata?: Metadata;
  availability?: Availability;
  published?: boolean;
  postedOn?: Date;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface RequestInit {
  method: string;
  headers: Record<string, string>;
  body?: string;
}
