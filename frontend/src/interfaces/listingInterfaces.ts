export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Review {}

export type Amenity =
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
  amenities: Amenity[];
  photos: string[];
  propertyType: PropertyType;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface Availability {
  startDate: string;
  endDate:string;
}

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
  availability?: Availability[];
  published?: boolean;
  postedOn?: Date;
}

export interface ListingsRes {
  listings: Listing[];
}

/** New and Edit (from edit page) Listing Form */
export interface NewListingFormData {
  title: string;
  address: Address;
  price: number;
  thumbnail: string;
  metadata: Metadata;
}

export interface EditListingFormData extends NewListingFormData {}

export interface AvailabilityAdd {
  availability: Availability[];
}

export interface AddListingRes {
  listingId: number;
}

export interface EditListingRes {}

export interface DeleteListingRes {}
