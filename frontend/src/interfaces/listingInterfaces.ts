export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface Review {}

type Ammenity =
  | 'Swimming Pool'
  | 'Gym'
  | 'Parking'
  | 'WiFi'
  | 'Air Conditioning';

interface Photo {}

type PropertyType = 'House' | 'Apartment' | 'Resort' | 'Mansion' | 'Hotel';

export interface Metadata {
  ammenities: Ammenity[];
  photos: Photo[];
  propertyType: PropertyType;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

interface Availability {}

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

export interface ListingRes {
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
