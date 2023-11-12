export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Review {}

export type Ammenity =
  | 'Swimming Pool'
  | 'Gym'
  | 'Parking'
  | 'WiFi'
  | 'Air Conditioning';

export type PropertyType =
  | 'House'
  | 'Apartment'
  | 'Resort'
  | 'Mansion'
  | 'Hotel';

export interface Metadata {
  ammenities: Ammenity[];
  photos: string[];
  propertyType: PropertyType;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface Availability {}

export interface Listing {
  // id
  id?: number;

  // always
  title: string;
  address: Address;
  thumbnail: string;
  price: number;

  // optionals
  reviews?: Review[];
  owner?: string;
  metadata?: Metadata;
  availability?: Availability;
  published?: boolean;
  postedOn?: Date;
}

export interface ListingsRes {
  listings: Listing[];
}

/** New Listing Form */
export interface NewListingFormData {
  title: string;
  address: Address;
  price: number;
  thumbnail: string;
  metadata: Metadata;
}

export interface AddListingRes {
  listingId: number;
}
